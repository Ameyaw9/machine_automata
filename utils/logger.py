import logging
import os
from logging.handlers import RotatingFileHandler
from config.settings import LOGGING_SETTINGS

def setup_logger(name):
    """
    Set up and configure logger with rotating file handler
    """
    # Create logs directory if it doesn't exist
    log_dir = os.path.dirname(LOGGING_SETTINGS['log_file'])
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Create logger
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, LOGGING_SETTINGS['log_level']))

    # Create rotating file handler
    file_handler = RotatingFileHandler(
        LOGGING_SETTINGS['log_file'],
        maxBytes=LOGGING_SETTINGS['max_log_size'],
        backupCount=LOGGING_SETTINGS['backup_count']
    )

    # Create console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    # Create formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    # Add handlers to logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger

# Create default logger instance
logger = setup_logger('automation_machine') 