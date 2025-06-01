"""
Configuration settings for the Automation Machine
"""

# GUI Settings
GUI_SETTINGS = {
    'window_title': "Intelligent Automation Machine",
    'window_size': "800x700",
    'background_color': '#f0f0f0',
    'font_family': 'Arial',
    'title_font_size': 16,
    'text_font_size': 10
}

# Automation Engine Settings
ENGINE_SETTINGS = {
    'max_suggestions': 3,
    'confidence_threshold': 20.0,  # Minimum confidence percentage to include a suggestion
    'max_history_entries': 10,     # Number of history entries to keep
    'complexity_cap': 10.0         # Maximum complexity score
}

# Logging Settings
LOGGING_SETTINGS = {
    'log_file': 'logs/automation_machine.log',
    'log_level': 'INFO',
    'max_log_size': 1024 * 1024,  # 1MB
    'backup_count': 5
}

# File Paths
PATHS = {
    'history_file': 'data/analysis_history.json',
    'backup_dir': 'backups/',
    'temp_dir': 'temp/'
}

# Default Categories and their weights
CATEGORY_WEIGHTS = {
    'file_operations': 1.0,
    'data_processing': 1.2,
    'web_automation': 1.3,
    'email_automation': 1.1,
    'system_monitoring': 1.4,
    'database_operations': 1.3,
    'api_integration': 1.2,
    'scheduled_tasks': 1.0
} 