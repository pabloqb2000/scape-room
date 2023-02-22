import os
import sys
import time
import logging
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler

class Handler(LoggingEventHandler):
    def on_modified(self, event):
        super().on_modified(event)
        fileTypes = ["py", "txt", "json", "css", "js"]
        if(event.src_path.split(".")[-1] in fileTypes):
            os.system("python generate.py")
            time.sleep(1)
  
if __name__ == "__main__":
    # Set the format for logging info
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
  
    # Set format for displaying path
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
  
    # Initialize logging event handler
    event_handler = Handler()
  
    # Initialize Observer
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
  
    # Start the observer
    observer.start()
    try:
        while True:
            # Set the thread sleep time
            time.sleep(20)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()