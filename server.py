"""Balloon Hangman local Python backend."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json, os
from pathlib import Path

WORDS = {
    "animals": ["tiger", "elephant", "penguin", "dolphin", "giraffe"],
    "food": ["pizza", "burger", "noodles", "pancake", "sandwich"],
    "movies": ["avatar", "batman", "frozen", "inception", "titanic"],
}

class GameHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/words":
            body = json.dumps(WORDS).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

if __name__ == "__main__":
    os.chdir(Path(__file__).resolve().parent.parent)
    print("Balloon Hangman: http://localhost:8000")
    ThreadingHTTPServer(("localhost", 8000), GameHandler).serve_forever()
