import unittest
from applications.auto_system import AutomationSuggestionEngine

class TestAutomationSuggestionEngine(unittest.TestCase):
    def setUp(self):
        self.engine = AutomationSuggestionEngine()

    def test_analyze_task_file_operations(self):
        task = "I need to organize and backup my files"
        result = self.engine.analyze_task(task)
        
        self.assertIn('suggestions', result)
        self.assertIn('complexity_score', result)
        self.assertIn('estimated_time', result)
        self.assertIn('recommended_approach', result)
        
        # Check if file operations is in suggestions
        categories = [s['category'] for s in result['suggestions']]
        self.assertIn('file_operations', categories)

    def test_analyze_task_web_automation(self):
        task = "I want to scrape data from a website"
        result = self.engine.analyze_task(task)
        
        categories = [s['category'] for s in result['suggestions']]
        self.assertIn('web_automation', categories)

    def test_complexity_estimation(self):
        # Test simple task
        simple_task = "Copy files from one folder to another"
        simple_result = self.engine.analyze_task(simple_task)
        
        # Test complex task
        complex_task = "Create a real-time system that monitors multiple servers, handles user authentication, and sends email notifications"
        complex_result = self.engine.analyze_task(complex_task)
        
        self.assertLess(simple_result['complexity_score'], complex_result['complexity_score'])

    def test_empty_task(self):
        task = ""
        result = self.engine.analyze_task(task)
        self.assertEqual(len(result['suggestions']), 0)

    def test_estimate_time(self):
        # Test different complexity scores
        self.assertEqual(self.engine._estimate_time(1.5), "1-3 hours")
        self.assertEqual(self.engine._estimate_time(3.5), "1-2 days")
        self.assertEqual(self.engine._estimate_time(5.5), "3-5 days")
        self.assertEqual(self.engine._estimate_time(7.5), "1-2 weeks")
        self.assertEqual(self.engine._estimate_time(9.5), "2+ weeks")

if __name__ == '__main__':
    unittest.main() 