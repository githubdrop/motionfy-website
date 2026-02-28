import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class BioLuminaAPITester:
    def __init__(self, base_url="https://biotech-connect-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict[Any, Any] = None, 
                 timeout: int = 10) -> tuple[bool, dict]:
        """Run a single API test"""
        url = f"{self.api_base}/{endpoint}" if endpoint else f"{self.api_base}/"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Try to parse JSON response
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response: Dict with keys: {list(response_data.keys())}")
                    return True, response_data
                except:
                    print("   Response: Non-JSON response")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text[:200]}...")
                
            self.test_results.append({
                "test": name,
                "passed": success,
                "status_code": response.status_code,
                "expected_status": expected_status
            })
            return success, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout}s")
            self.test_results.append({
                "test": name,
                "passed": False,
                "error": "Timeout"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "passed": False,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test("Root API Endpoint", "GET", "", 200)

    def test_team_endpoint(self):
        """Test getting team members"""
        success, data = self.run_test("Team Members", "GET", "team", 200)
        if success and isinstance(data, list):
            print(f"   Found {len(data)} team members")
            if len(data) > 0:
                sample = data[0]
                required_fields = ['id', 'name', 'role', 'bio', 'image_url']
                missing = [f for f in required_fields if f not in sample]
                if missing:
                    print(f"   ⚠️ Missing fields in team data: {missing}")
        return success

    def test_case_studies_endpoint(self):
        """Test getting case studies"""
        success, data = self.run_test("Case Studies", "GET", "case-studies", 200)
        if success and isinstance(data, list):
            print(f"   Found {len(data)} case studies")
            if len(data) > 0:
                sample = data[0]
                required_fields = ['id', 'title', 'client', 'industry', 'challenge', 'solution', 'results']
                missing = [f for f in required_fields if f not in sample]
                if missing:
                    print(f"   ⚠️ Missing fields in case study data: {missing}")
        return success

    def test_single_case_study(self):
        """Test getting a single case study"""
        return self.run_test("Single Case Study", "GET", "case-studies/1", 200)

    def test_blog_endpoint(self):
        """Test getting blog posts"""
        success, data = self.run_test("Blog Posts", "GET", "blog", 200)
        if success and isinstance(data, list):
            print(f"   Found {len(data)} blog posts")
            if len(data) > 0:
                sample = data[0]
                required_fields = ['id', 'title', 'excerpt', 'content', 'author', 'category']
                missing = [f for f in required_fields if f not in sample]
                if missing:
                    print(f"   ⚠️ Missing fields in blog data: {missing}")
        return success

    def test_single_blog_post(self):
        """Test getting a single blog post"""
        return self.run_test("Single Blog Post", "GET", "blog/1", 200)

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "John Test",
            "email": "john.test@example.com",
            "company": "Test Company",
            "phone": "+1 (555) 123-4567",
            "service_interest": "Brand Strategy",
            "message": "This is a test message from the API tester."
        }
        success, response = self.run_test("Contact Form Submission", "POST", "contact", 200, test_data)
        if success and response:
            required_fields = ['id', 'name', 'email', 'message', 'created_at']
            missing = [f for f in required_fields if f not in response]
            if missing:
                print(f"   ⚠️ Missing fields in contact response: {missing}")
            else:
                print(f"   Contact saved with ID: {response.get('id')}")
        return success

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        test_data = {
            "email": "newsletter.test@example.com"
        }
        success, response = self.run_test("Newsletter Subscription", "POST", "newsletter", 200, test_data)
        if success and response:
            required_fields = ['id', 'email', 'subscribed_at', 'is_active']
            missing = [f for f in required_fields if f not in response]
            if missing:
                print(f"   ⚠️ Missing fields in newsletter response: {missing}")
            else:
                print(f"   Newsletter subscription saved with ID: {response.get('id')}")
        return success

    def test_get_contact_submissions(self):
        """Test getting contact submissions"""
        return self.run_test("Get Contact Submissions", "GET", "contact", 200)

    def test_nonexistent_endpoints(self):
        """Test error handling for non-existent endpoints"""
        success = True
        
        # Test non-existent case study
        not_found, _ = self.run_test("Non-existent Case Study", "GET", "case-studies/999", 404)
        success = success and not_found
        
        # Test non-existent blog post
        not_found, _ = self.run_test("Non-existent Blog Post", "GET", "blog/999", 404)
        success = success and not_found
        
        return success

def main():
    """Main test execution"""
    print("🚀 Starting BioLumina API Tests")
    print("=" * 60)
    
    tester = BioLuminaAPITester()
    
    # Run all tests
    test_functions = [
        tester.test_root_endpoint,
        tester.test_team_endpoint,
        tester.test_case_studies_endpoint,
        tester.test_single_case_study,
        tester.test_blog_endpoint,
        tester.test_single_blog_post,
        tester.test_contact_submission,
        tester.test_newsletter_subscription,
        tester.test_get_contact_submissions,
        tester.test_nonexistent_endpoints,
    ]
    
    print(f"\nRunning {len(test_functions)} test groups...")
    
    for test_func in test_functions:
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test function {test_func.__name__} failed with error: {e}")
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Test Results Summary:")
    print(f"   Tests Passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "   Success Rate: N/A")
    
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print(f"\n⚠️ {tester.tests_run - tester.tests_passed} test(s) failed. Check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())