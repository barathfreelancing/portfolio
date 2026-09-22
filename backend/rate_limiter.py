import time
from collections import defaultdict
from typing import Dict, List

class InMemoryRateLimiter:
    """Simple in-memory rate limiter using a sliding window of request timestamps."""
    def __init__(self, max_requests: int = 5, window_seconds: int = 600):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: Dict[str, List[float]] = defaultdict(list)

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds

        # Filter out timestamps older than the window
        timestamps = [t for t in self.requests[client_ip] if t > window_start]
        self.requests[client_ip] = timestamps

        if len(timestamps) >= self.max_requests:
            return False

        timestamps.append(now)
        return True

rate_limiter = InMemoryRateLimiter(max_requests=5, window_seconds=600)
