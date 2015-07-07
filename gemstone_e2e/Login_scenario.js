describe('Login page',	function() {
	beforeEach(function() {
	//required for testing non-angular sites
 // browser.driver.ignoreSynchronization = true;
    browser.driver.get(browser.params.baseUrl+"/login");
  });
/*
  it('should login with username/password in login page of Media Operations Platform (MOP)', function(){
		//browser.driver.get(browser.baseUrl+"/login");
		browser.driver.findElement(by.name('email')).sendKeys('test.gmail.com');
		browser.driver.findElement(by.name('password')).sendKeys('test');
		browser.driver.findElement(By.tagName('button')).click();
		expect(browser.driver.getCurrentUrl()).toContain('/login');
	},50000);
 */
	it('should login with username/password in login page of Media Operations Platform (MOP)', function(){
		expect(browser.driver.getCurrentUrl()).toContain('/login');
		browser.driver.findElement(by.name('email')).sendKeys(browser.params.userID);
		browser.driver.findElement(by.name('password')).sendKeys(browser.params.password);
		browser.driver.findElement(By.tagName('button')).click();
		browser.driver.sleep(10000);
  	expect(browser.driver.getCurrentUrl()).toContain('/dashboard');
	},50000);
});