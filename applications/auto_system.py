import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import json
import re
from datetime import datetime
from typing import Dict, List, Tuple
import threading
import os
import sys

# Add project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.settings import GUI_SETTINGS, ENGINE_SETTINGS, PATHS
from utils.logger import logger

class AutomationSuggestionEngine:
    def __init__(self):
        logger.info("Initializing AutomationSuggestionEngine")
        self.automation_patterns = {
            'file_operations': {
                'keywords': ['file', 'folder', 'copy', 'move', 'rename', 'organize', 'backup'],
                'tools': ['Python os/shutil', 'PowerShell', 'Batch scripts', 'Robocopy'],
                'difficulty': 'Easy',
                'description': 'File and folder management automation'
            },
            'data_processing': {
                'keywords': ['csv', 'excel', 'data', 'spreadsheet', 'report', 'analysis'],
                'tools': ['Python pandas', 'Excel VBA', 'Power Query', 'SQL'],
                'difficulty': 'Medium',
                'description': 'Data manipulation and reporting automation'
            },
            'web_automation': {
                'keywords': ['website', 'web', 'browser', 'scraping', 'form', 'download'],
                'tools': ['Selenium', 'Beautiful Soup', 'Playwright', 'Requests'],
                'difficulty': 'Medium',
                'description': 'Web browser and scraping automation'
            },
            'email_automation': {
                'keywords': ['email', 'outlook', 'gmail', 'send', 'notification'],
                'tools': ['Python smtplib', 'Outlook VBA', 'Gmail API', 'Zapier'],
                'difficulty': 'Medium',
                'description': 'Email sending and processing automation'
            },
            'system_monitoring': {
                'keywords': ['monitor', 'system', 'performance', 'log', 'alert', 'health'],
                'tools': ['Python psutil', 'PowerShell', 'Nagios', 'Custom scripts'],
                'difficulty': 'Hard',
                'description': 'System monitoring and alerting automation'
            },
            'database_operations': {
                'keywords': ['database', 'sql', 'backup', 'sync', 'migration', 'query'],
                'tools': ['SQL scripts', 'Python SQLAlchemy', 'PowerShell', 'Database tools'],
                'difficulty': 'Medium',
                'description': 'Database management and operations automation'
            },
            'api_integration': {
                'keywords': ['api', 'integration', 'webhook', 'sync', 'third-party'],
                'tools': ['Python requests', 'Postman', 'REST APIs', 'GraphQL'],
                'difficulty': 'Medium',
                'description': 'API integration and data synchronization'
            },
            'scheduled_tasks': {
                'keywords': ['schedule', 'cron', 'daily', 'weekly', 'routine', 'recurring'],
                'tools': ['Cron jobs', 'Windows Task Scheduler', 'Python schedule', 'Jenkins'],
                'difficulty': 'Easy',
                'description': 'Scheduled and recurring task automation'
            }
        }
        
        self.complexity_factors = {
            'multiple_systems': 2,
            'user_interaction': 1.5,
            'error_handling': 1.3,
            'real_time': 2,
            'security': 1.8,
            'scalability': 1.6
        }
    
    def analyze_task(self, task_description: str) -> Dict:
        """Analyze task description and suggest automation approaches"""
        logger.info(f"Analyzing task: {task_description[:100]}...")
        task_lower = task_description.lower()
        suggestions = []
        
        # Match patterns
        for category, info in self.automation_patterns.items():
            score = 0
            matched_keywords = []
            
            for keyword in info['keywords']:
                if keyword in task_lower:
                    score += 1
                    matched_keywords.append(keyword)
            
            if score > 0:
                confidence = min(score / len(info['keywords']) * 100, 100)
                if confidence >= ENGINE_SETTINGS['confidence_threshold']:
                    suggestions.append({
                        'category': category,
                        'confidence': confidence,
                        'tools': info['tools'],
                        'difficulty': info['difficulty'],
                        'description': info['description'],
                        'matched_keywords': matched_keywords
                    })
        
        # Sort by confidence
        suggestions.sort(key=lambda x: x['confidence'], reverse=True)
        
        # Estimate complexity
        complexity_score = self._estimate_complexity(task_description)
        
        logger.info(f"Analysis complete. Found {len(suggestions)} suggestions with complexity score {complexity_score}")
        
        return {
            'suggestions': suggestions[:ENGINE_SETTINGS['max_suggestions']],
            'complexity_score': complexity_score,
            'estimated_time': self._estimate_time(complexity_score),
            'recommended_approach': self._recommend_approach(suggestions[0] if suggestions else None)
        }
    
    def _estimate_complexity(self, task_description: str) -> float:
        """Estimate task complexity based on various factors"""
        base_score = 1.0
        task_lower = task_description.lower()
        
        # Check for complexity indicators
        if any(word in task_lower for word in ['multiple', 'several', 'many', 'various']):
            base_score *= self.complexity_factors['multiple_systems']
        
        if any(word in task_lower for word in ['user', 'input', 'manual', 'interactive']):
            base_score *= self.complexity_factors['user_interaction']
        
        if any(word in task_lower for word in ['error', 'exception', 'failure', 'robust']):
            base_score *= self.complexity_factors['error_handling']
        
        if any(word in task_lower for word in ['real-time', 'instant', 'immediate', 'live']):
            base_score *= self.complexity_factors['real_time']
        
        if any(word in task_lower for word in ['secure', 'authentication', 'permission', 'access']):
            base_score *= self.complexity_factors['security']
        
        return min(base_score, 10.0)  # Cap at 10
    
    def _estimate_time(self, complexity_score: float) -> str:
        """Estimate development time based on complexity"""
        if complexity_score <= 2:
            return "1-3 hours"
        elif complexity_score <= 4:
            return "1-2 days"
        elif complexity_score <= 6:
            return "3-5 days"
        elif complexity_score <= 8:
            return "1-2 weeks"
        else:
            return "2+ weeks"
    
    def _recommend_approach(self, top_suggestion: Dict) -> str:
        """Recommend the best approach based on top suggestion"""
        if not top_suggestion:
            return "Consider breaking down the task into smaller, more specific components."
        
        category = top_suggestion['category']
        
        approaches = {
            'file_operations': "Start with Python's os and shutil modules for basic operations, then consider GUI tools like Windows Explorer automation.",
            'data_processing': "Use Python pandas for data manipulation, or Excel VBA if working primarily with Excel files.",
            'web_automation': "Begin with Selenium for browser automation, or requests/BeautifulSoup for web scraping.",
            'email_automation': "Python's smtplib for simple sending, or email service APIs for advanced features.",
            'system_monitoring': "Start with Python psutil for system metrics, then build alerting on top.",
            'database_operations': "Use SQL scripts for simple operations, Python SQLAlchemy for complex integrations.",
            'api_integration': "Python requests library is ideal for most API integrations.",
            'scheduled_tasks': "Use cron (Linux/Mac) or Task Scheduler (Windows) for simple scheduling."
        }
        
        return approaches.get(category, "Consider a step-by-step approach starting with the core functionality.")

class AutomationMachineGUI:
    def __init__(self, root):
        logger.info("Initializing GUI")
        self.root = root
        self.root.title(GUI_SETTINGS['window_title'])
        self.root.geometry(GUI_SETTINGS['window_size'])
        self.root.configure(bg=GUI_SETTINGS['background_color'])
        
        self.engine = AutomationSuggestionEngine()
        self.analysis_history = []
        
        # Create necessary directories
        self._create_directories()
        
        # Load history if exists
        self._load_history()
        
        self.setup_gui()
    
    def _create_directories(self):
        """Create necessary directories for the application"""
        for path in [PATHS['backup_dir'], PATHS['temp_dir'], os.path.dirname(PATHS['history_file'])]:
            if not os.path.exists(path):
                os.makedirs(path)
    
    def _load_history(self):
        """Load analysis history from file"""
        try:
            if os.path.exists(PATHS['history_file']):
                with open(PATHS['history_file'], 'r') as f:
                    self.analysis_history = json.load(f)
                logger.info(f"Loaded {len(self.analysis_history)} history entries")
        except Exception as e:
            logger.error(f"Error loading history: {str(e)}")
    
    def _save_history(self):
        """Save analysis history to file"""
        try:
            with open(PATHS['history_file'], 'w') as f:
                json.dump(self.analysis_history[-ENGINE_SETTINGS['max_history_entries']:], f)
            logger.info("History saved successfully")
        except Exception as e:
            logger.error(f"Error saving history: {str(e)}")
    
    def setup_gui(self):
        # Main title
        title_label = tk.Label(self.root, text="🤖 Intelligent Automation Machine", 
                              font=("Arial", 16, "bold"), bg='#f0f0f0', fg='#2c3e50')
        title_label.pack(pady=10)
        
        # Input frame
        input_frame = ttk.LabelFrame(self.root, text="Describe Your Task", padding="10")
        input_frame.pack(fill="x", padx=20, pady=10)
        
        self.task_text = scrolledtext.ScrolledText(input_frame, height=4, wrap=tk.WORD)
        self.task_text.pack(fill="x", pady=5)
        
        # Button frame
        button_frame = tk.Frame(input_frame, bg='#f0f0f0')
        button_frame.pack(fill="x", pady=5)
        
        analyze_btn = tk.Button(button_frame, text="🔍 Analyze Task", 
                               command=self.analyze_task, bg='#3498db', fg='white',
                               font=("Arial", 10, "bold"))
        analyze_btn.pack(side="left", padx=5)
        
        clear_btn = tk.Button(button_frame, text="🗑️ Clear", 
                             command=self.clear_input, bg='#e74c3c', fg='white',
                             font=("Arial", 10, "bold"))
        clear_btn.pack(side="left", padx=5)
        
        # Results frame
        results_frame = ttk.LabelFrame(self.root, text="Automation Suggestions", padding="10")
        results_frame.pack(fill="both", expand=True, padx=20, pady=10)
        
        self.results_text = scrolledtext.ScrolledText(results_frame, wrap=tk.WORD, 
                                                     font=("Consolas", 10))
        self.results_text.pack(fill="both", expand=True)
        
        # Status frame
        status_frame = tk.Frame(self.root, bg='#f0f0f0')
        status_frame.pack(fill="x", padx=20, pady=5)
        
        self.status_label = tk.Label(status_frame, text="Ready to analyze tasks", 
                                   bg='#f0f0f0', fg='#7f8c8d')
        self.status_label.pack(side="left")
        
        # History button
        history_btn = tk.Button(status_frame, text="📋 History", 
                               command=self.show_history, bg='#9b59b6', fg='white')
        history_btn.pack(side="right")
    
    def analyze_task(self):
        task_description = self.task_text.get("1.0", tk.END).strip()
        
        if not task_description:
            messagebox.showwarning("Warning", "Please enter a task description.")
            return
        
        self.status_label.config(text="Analyzing task...")
        self.root.update()
        
        # Run analysis in thread to prevent GUI freezing
        def run_analysis():
            try:
                analysis = self.engine.analyze_task(task_description)
                self.display_results(analysis, task_description)
                
                # Add to history
                self.analysis_history.append({
                    'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    'task': task_description[:100] + "..." if len(task_description) > 100 else task_description,
                    'analysis': analysis
                })
                
                self.status_label.config(text="Analysis complete")
            except Exception as e:
                messagebox.showerror("Error", f"Analysis failed: {str(e)}")
                self.status_label.config(text="Analysis failed")
        
        threading.Thread(target=run_analysis, daemon=True).start()
    
    def display_results(self, analysis, task_description):
        self.results_text.delete("1.0", tk.END)
        
        # Header
        self.results_text.insert(tk.END, "="*60 + "\n")
        self.results_text.insert(tk.END, "🎯 AUTOMATION ANALYSIS RESULTS\n")
        self.results_text.insert(tk.END, "="*60 + "\n\n")
        
        # Task summary
        self.results_text.insert(tk.END, f"📝 Task: {task_description[:200]}{'...' if len(task_description) > 200 else ''}\n\n")
        
        # Complexity assessment
        complexity = analysis['complexity_score']
        complexity_level = "Low" if complexity <= 3 else "Medium" if complexity <= 6 else "High"
        
        self.results_text.insert(tk.END, f"⚡ Complexity: {complexity_level} ({complexity:.1f}/10)\n")
        self.results_text.insert(tk.END, f"⏱️ Estimated Time: {analysis['estimated_time']}\n\n")
        
        # Top suggestions
        if analysis['suggestions']:
            self.results_text.insert(tk.END, "🚀 TOP AUTOMATION SUGGESTIONS:\n")
            self.results_text.insert(tk.END, "-"*40 + "\n")
            
            for i, suggestion in enumerate(analysis['suggestions'], 1):
                self.results_text.insert(tk.END, f"\n{i}. {suggestion['category'].replace('_', ' ').title()}\n")
                self.results_text.insert(tk.END, f"   📊 Confidence: {suggestion['confidence']:.1f}%\n")
                self.results_text.insert(tk.END, f"   📚 Description: {suggestion['description']}\n")
                self.results_text.insert(tk.END, f"   🔧 Recommended Tools: {', '.join(suggestion['tools'])}\n")
                self.results_text.insert(tk.END, f"   🎯 Difficulty: {suggestion['difficulty']}\n")
                self.results_text.insert(tk.END, f"   🔍 Matched Keywords: {', '.join(suggestion['matched_keywords'])}\n")
        
        # Recommended approach
        self.results_text.insert(tk.END, f"\n💡 RECOMMENDED APPROACH:\n")
        self.results_text.insert(tk.END, "-"*40 + "\n")
        self.results_text.insert(tk.END, f"{analysis['recommended_approach']}\n\n")
        
        # Implementation steps
        self.results_text.insert(tk.END, "📋 IMPLEMENTATION STEPS:\n")
        self.results_text.insert(tk.END, "-"*40 + "\n")
        steps = self.generate_implementation_steps(analysis)
        for i, step in enumerate(steps, 1):
            self.results_text.insert(tk.END, f"{i}. {step}\n")
        
        self.results_text.insert(tk.END, "\n" + "="*60 + "\n")
    
    def generate_implementation_steps(self, analysis):
        """Generate implementation steps based on analysis"""
        if not analysis['suggestions']:
            return [
                "Break down the task into smaller, specific components",
                "Research available tools and technologies",
                "Create a prototype for the core functionality",
                "Test and iterate on the solution",
                "Add error handling and logging",
                "Document the automation process"
            ]
        
        top_category = analysis['suggestions'][0]['category']
        
        steps_map = {
            'file_operations': [
                "Set up Python environment with os and shutil modules",
                "Create a script to handle basic file operations",
                "Add error handling for file access issues",
                "Test with sample files and folders",
                "Add logging and progress tracking",
                "Schedule the script if needed"
            ],
            'web_automation': [
                "Install Selenium or similar web automation tool",
                "Identify web elements to interact with",
                "Create basic automation script",
                "Handle dynamic content and wait conditions",
                "Add error handling for network issues",
                "Test across different browsers if needed"
            ],
            'data_processing': [
                "Install pandas and relevant data libraries",
                "Analyze the data structure and requirements",
                "Create data processing pipeline",
                "Add data validation and cleaning steps",
                "Generate reports or outputs",
                "Schedule regular data processing if needed"
            ]
        }
        
        return steps_map.get(top_category, [
            "Research and plan the automation approach",
            "Set up development environment",
            "Create a minimal viable automation",
            "Test and debug the solution",
            "Add robustness and error handling",
            "Deploy and monitor the automation"
        ])
    
    def clear_input(self):
        self.task_text.delete("1.0", tk.END)
        self.results_text.delete("1.0", tk.END)
        self.status_label.config(text="Ready to analyze tasks")
    
    def show_history(self):
        if not self.analysis_history:
            messagebox.showinfo("History", "No analysis history available.")
            return
        
        history_window = tk.Toplevel(self.root)
        history_window.title("Analysis History")
        history_window.geometry("600x400")
        
        history_text = scrolledtext.ScrolledText(history_window, wrap=tk.WORD)
        history_text.pack(fill="both", expand=True, padx=10, pady=10)
        
        for entry in self.analysis_history[-10:]:  # Show last 10 entries
            history_text.insert(tk.END, f"Timestamp: {entry['timestamp']}\n")
            history_text.insert(tk.END, f"Task: {entry['task']}\n")
            history_text.insert(tk.END, f"Top Suggestion: {entry['analysis']['suggestions'][0]['category'] if entry['analysis']['suggestions'] else 'None'}\n")
            history_text.insert(tk.END, "-"*50 + "\n\n")

def main():
    try:
        logger.info("Starting Automation Machine")
        root = tk.Tk()
        app = AutomationMachineGUI(root)
        root.mainloop()
    except Exception as e:
        logger.error(f"Application error: {str(e)}")
        messagebox.showerror("Error", f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()