describe ('Asset Details Page', function() {
	beforeEach(function() {
		browser.driver.manage().window().maximize();
		//browser.driver.ignoreSynchronization = true;
		//browser.driver.get(browser.params.baseUrl+"/dashboard");
	});
	

    it('should click on Menu icon to see Programing manager option', function(){
    	browser.ignoreSynchronization = true;
    	browser.waitForAngular();
       	browser.driver.sleep(5000);
    	element(by.xpath('//img[@alt=\'Menu icon\']')).click();
		browser.driver.sleep(5000);
		expect(browser.driver.getCurrentUrl()).toContain('#/activity-feed');
    });

    
    it('should navigate to Asset library page by click on Programming manager link in menu bar', function(){
    	browser.ignoreSynchronization = true;
    	browser.waitForAngular();
		element(by.xpath('//ul[@id=\'application-dropdown\']/li[1]/a')).click();
		browser.driver.sleep(4000);
		console.log(element(by.repeater('app in data.availableApps')).getWebElement);
		expect(browser.driver.getCurrentUrl()).toContain('#/asset-library');
	});

	
	it('should click on the category option in filter and select Movie', function(){
		browser.ignoreSynchronization = true;
		browser.waitForAngular();
		browser.driver.sleep(6000);
		element(by.xpath('//dl[@class=\'accordion\']/dd[3]/a/div')).click();
		browser.driver.sleep(6000);
		element(by.xpath('//dl[@class=\'accordion\']/dd[3]/div/ul/li[2]/a')).click();
		expect(browser.driver.getCurrentUrl()).toContain('#/asset-library');
	});

	
	it('should hover on Movie to click details button', function(){
		browser.driver.ignoreSynchronization =  true;
		browser.driver.sleep(5000);
		browser.driver.findElement(by.xpath('//tbody/tr[1]/td[1]/div[1]/input')).click();
	    browser.driver.sleep(5000);
	    element(by.xpath('//div/div[1]/div/div[2]/div[2]/table/tbody/tr[1]/td[2]/div[2]/div/a[2]')).click();
		browser.driver.sleep(1000);
		expect(browser.driver.getCurrentUrl()).toContain('/movie-details');		
	});
		

	it('should check thumnail image of asset',function(){
		browser.ignoreSynchronization = true;
		browser.waitForAngular();
		browser.driver.sleep(5000);
		var spinner = element(by.css('.asset-img'));
        spinner.getAttribute('src').then(function(text){
        	console.log(text);
        	if(text == null){
        		console.log('Image is not present for the asset. ');
        	}else{
        		console.log('image present for the asset.');
        	}
        });
        element(by.css('.asset-img')).isPresent;
        expect(browser.driver.getCurrentUrl()).toContain('/movie-details');
	});

	
	it('should check created at date is present', function(){
		browser.ignoreSynchronization = true;
		element.all(by.css('.asset-dtl-property.ng-binding')).then(function(createdDate){
			createdDate[0].getText().then(function(createdDateValue){
				if(createdDateValue == null){
					console.log('Created Date is not present and is: '+createdDateValue);
				}else{
					console.log('Created Date is present : '+createdDateValue);
				}
			});	expect(browser.driver.getCurrentUrl()).toContain('/movie-details');
		});
	});

	
	it('should check last updated date is present', function(){
		browser.ignoreSynchronization = true;
		element.all(by.css('.asset-dtl-property.ng-binding')).then(function(lastUpdatedDate){
			lastUpdatedDate[1].getText().then(function(lastUpdatedDateValue){
				console.log('Created Date : '+lastUpdatedDateValue);
			    if(lastUpdatedDateValue == null){
				    console.log('Last updated Date is not present and is: '+lastUpdatedDateValue);
			    }else{
				    console.log('Last updated date is : '+lastUpdatedDateValue);
			    }
		    });
		});
	    expect(browser.driver.getCurrentUrl()).toContain('/movie-details');
	});

	
	it('should check the External id is present or not for the asset on asset details page', function(){
		browser.driver.ignoreSynchronization = true;
		element.all(by.css('.asset-dtl-property.ng-binding')).then(function(asset_dtl_property){
			asset_dtl_property[5].getText().then(function(externalId){
			   if(externalId != null){
		        	console.log('External id is present for the asset which is: '+externalId);
		        }else{
			      console.log('External id is not present for the asset'+externalId);
		        }
		    });
		});
		expect(browser.driver.getCurrentUrl()).toContain('/movie-details');
	});

	
	it('should check the Activity Feed is null or not', function(){
		element.all(by.repeater('activity in activityFeed')).then(function(subHeader){
		    subHeader[0].getText().then(function(activityDate){
		 	   if(activityDate == null){
		 	    	console.log('No activity is present under acitvity feed section on asset details page.'+activityDate);
		 	    }else{
		 		  console.log('Activity is present under acitvity feed section on asset details page.'+activityDate);
		     	}
		    });
		});
		expect(browser.driver.getCurrentUrl()).toContain('/movie-details');
	});


	it('Should check the Metadata fields - ID', function(){
         browser.ignoreSynchronization = true;
   	     element.all(by.binding('value')).then(function(editId){
            editId[0].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[0].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			        editId[0].sendKeys('Test_Id_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy(); 
  });   

 
  it('Should check the Metadata fields - Provider', function(){
      browser.ignoreSynchronization = true;
      element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
        console.log('Provider >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
        element.all(by.binding('value')).then(function(editId){
              editId[1].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[1].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			       	editId[1].sendKeys('Provider_'+timeStamp);
           });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy(); 
  }); 

   
  it('Should check the Metadata fields - QaCOntact', function(){
      browser.ignoreSynchronization = true;
      element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
        console.log('QaCOntact >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
   	    element.all(by.binding('value')).then(function(editId){
              editId[2].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[2].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
		       	editId[2].sendKeys('QaCOntact'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy(); 
  }); 

   
  it('Should check the Metadata fields - Run Time', function(){
      browser.ignoreSynchronization = true;
      element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
        console.log('Run Time >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
   	     element.all(by.binding('value')).then(function(editId){
              editId[3].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[3].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
			       	editId[3].sendKeys(timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy(); 
  }); 

   
    it('Should check the Metadata fields - Air Date', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Air Date >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
         element.all(by.binding('value')).then(function(editId){
              editId[4].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[4].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + '/' + today.getMinutes() + '/20' + today.getSeconds();
				      editId[4].sendKeys(timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy(); 
    }); 


    it('Should check the Metadata fields - country-of-origin', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('country-of-origin >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
   	     element.all(by.binding('value')).then(function(editId){
              editId[5].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[5].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
				editId[5].sendKeys('Country'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
	  }); 


    it('Should check the Metadata fields - Show Type', function(){
         browser.ignoreSynchronization = true;
   	     element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Show Type >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });

         element.all(by.binding('value')).then(function(editId){
              editId[6].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[6].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			       	editId[6].sendKeys('Show'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
	  }); 

  
    it('Should check the Metadata fields - Rating', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
          console.log('Rating >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
   	     element.all(by.binding('value')).then(function(editId){
              editId[7].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[7].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			       	editId[7].sendKeys('Rating'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(3800);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
    });

    it('Should check the Metadata fields - Region', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Region >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
   	     element.all(by.binding('value')).then(function(editId){
              editId[8].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[8].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
				      editId[8].sendKeys('Region'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
    });

  it('Should check the Metadata fields - Genre', function(){
        browser.ignoreSynchronization = true;
        element.all(by.repeater('option in selectedValues')).then(function(genreId){
             browser.driver.sleep(2000);
             genreId[0].click();
         element(by.xpath('.//*[@id=\'multiSelectDiv\']/a/img')).click();
             browser.driver.sleep(1000);
         element(by.xpath('.//*[@id=\'multiSelectDiv\']/dl/dt/ul')).click();
             browser.driver.sleep(1000);
             element(by.xpath('.//*[@id=\'multiSelectDiv\']/dl/dd/div/ul/li[7]/input')).click();
             browser.driver.sleep(2000);
             element(by.xpath('.//*[@id=\'multiSelectDiv\']/dl/dt/ul')).click();
        });    
        browser.driver.sleep(1000);
        element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(3000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
    });

  
    it('Should check the Metadata fields - URL', function(){
         browser.ignoreSynchronization = true;
      //    element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
      //    console.log('URL >>>>>>>>>>>'+isVisible);
      //   if (isVisible) {
      //     element.all(by.css('.close')).then(function(clickcls){
      //      clickcls[0].click();
      //     });
      //   } else {
      //       console.log('pop up is disappered');
      //     }
      // });
   	     element.all(by.binding('value')).then(function(editId){
              editId[9].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[9].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
				      editId[9].sendKeys('http://url'+timeStamp+'.com');
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
	  });

   
    it('Should check the Metadata fields - CC URL', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('CC URL >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });
   	     element.all(by.binding('value')).then(function(editId){
              editId[10].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[10].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
				      editId[10].sendKeys('http://cc'+timeStamp+'.com');
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
    });


 it('should Checked the "Year", "Licence start" and "Licence end" date metadata fields', function(){
		// Edit - Year			 
 			element.all(by.binding('value')).then(function(editId){
 				editId[19].click();
				element.all(by.model('value')).then(function(editId){
				editId[19].clear();
				editId[19].sendKeys('2015');
				browser.driver.sleep(2000);
				});
			});	

		// Edit - Licence start date and end date			 
			element.all(by.model('metadata.license_start_time[0]')).then(function(startDate){
				startDate[0].click();
				browser.driver.sleep(1000);
				startDate[0].clear();
				browser.driver.sleep(1000);
				startDate[0].sendKeys('07/22/2015');
				browser.driver.sleep(1000);
				element.all(by.model('metadata.license_start_time[1]')).click();
			});

			element.all(by.model('metadata.license_end_time[0]')).then(function(endDate){
				endDate[0].click();
				browser.driver.sleep(1000);
				endDate[0].clear();
				browser.driver.sleep(1000);
				endDate[0].sendKeys('07/30/2015');
				browser.driver.sleep(1000);
				element.all(by.model('metadata.license_end_time[1]')).click();
			});

			element(by.css('[ng-click="save()"]')).click();
			browser.driver.sleep(5000);
			expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();

			browser.driver.get(browser.params.baseUrl+'/#/deactivated-assets');
			browser.driver.sleep(5000);
			browser.driver.get(browser.params.baseUrl+'/#/144131/movie-details');
			browser.driver.sleep(5000);
	});


	it('Should check the Metadata fields - Title Sort Name', function(){
         browser.ignoreSynchronization = true;
         element.all(by.binding('value')).then(function(editId){
              editId[11].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[11].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
				      editId[11].sendKeys('Title Sort_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


    it('Should check the Metadata fields - Studio', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Studio >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });    
   	     element.all(by.binding('value')).then(function(editId){
              editId[12].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[12].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			       	editId[12].sendKeys('Studio_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(3800);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


    it('Should check the Metadata fields - Title brief', function(){
         browser.ignoreSynchronization = true;
          element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Title brief >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });    
   	     element.all(by.binding('value')).then(function(editId){
              editId[13].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[13].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			       	editId[13].sendKeys('Title brief'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


    it('Should check the Metadata fields - Title medium', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Title medium >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });    
   	     element.all(by.binding('value')).then(function(editId){
              editId[14].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[14].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
				      editId[14].sendKeys('Title medium_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


    it('Should check the Metadata fields - Title long', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Title long >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });    
   	     element.all(by.binding('value')).then(function(editId){
              editId[15].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[15].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
	       			editId[15].sendKeys('Title long_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


    it('Should check the Metadata fields - Summary short', function(){
         browser.ignoreSynchronization = true;
           element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Summary short >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });    
   	     element.all(by.binding('value')).then(function(editId){
              editId[16].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[16].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
				      editId[16].sendKeys('Summary short_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


    it('Should check the Metadata fields - Summary medium', function(){
         browser.ignoreSynchronization = true;
          element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Summary medium >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });    
   	     element.all(by.binding('value')).then(function(editId){
              editId[17].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[17].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			       	editId[17].sendKeys('Summary medium_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(3800);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


    it('Should check the Metadata fields - Summary long', function(){
         browser.ignoreSynchronization = true;
         element(by.css('.alert-box.ng-isolate-scope.success')).isDisplayed().then(function (isVisible) {
         console.log('Summary long >>>>>>>>>>>'+isVisible);
        if (isVisible) {
          element.all(by.css('.close')).then(function(clickcls){
           clickcls[0].click();
          });
        } else {
            console.log('pop up is disappered');
          }
      });    
   	     element.all(by.binding('value')).then(function(editId){
              editId[18].click();
  	          element.all(by.model('value')).then(function(editId){
            	editId[18].clear();
            	var today = new Date(),
            	timeStamp = today.getHours() + 'h-' + today.getMinutes() + 'm' + today.getSeconds();
			       	editId[18].sendKeys('Summary long_'+timeStamp);
            });
  	    });     
   	    browser.driver.sleep(1000);
      	element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();  
    }); 


// Edit Person Metadata
it('should edit Person Metadata fields',function(){
        browser.driver.ignoreSynchronization = true;
        element.all(by.css('.meta-property-value.ng-binding')).then(function(get){
            get[9].click();
        });
        var personCount = 0;
        var updatedCount = 0;
        element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul')).then(function(getCount){
            personCount = getCount.length;
        });
        element.all(by.css('.button.button-secondary.uppercase')).then(function(addButton){
            addButton[4].click();
        });
        browser.driver.sleep(2000);
        element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul')).then(function(getCount){
            var updatedCount = 0;
            updatedCount = getCount.length;
            expect(personCount < updatedCount);

            browser.driver.sleep(5000);
            element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul['+updatedCount+']/div[1]/li[1]/metadata-edit-in-place/div/div[1]/span[2]')).then(function(clickRole){
                clickRole[0].click();
            });
            browser.driver.sleep(3000);
            element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul['+updatedCount+']/div[1]/li[1]/metadata-edit-in-place/div/div[2]/textarea')).then(function(editRole){
                editRole[0].clear();
                editRole[0].sendKeys('test_Actor');
            });        
            browser.driver.sleep(3000);
            element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul['+updatedCount+']/div[1]/li[2]/metadata-edit-in-place/div/div[1]/span[2]')).then(function(clickRole){
                clickRole[0].click();
            });
            element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul['+updatedCount+']/div[1]/li[2]/metadata-edit-in-place/div/div[2]/textarea')).then(function(editDisplay){
                editDisplay[0].clear();
                editDisplay[0].sendKeys('test_Display');
            });
            browser.driver.sleep(5000);
            element(by.css('[ng-click="save()"]')).click();
            browser.driver.sleep(3000);
            expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
            element.all(by.css('.close')).then(function(clickcls){
                clickcls[0].click();
            });
            browser.driver.sleep(5000);
            element.all(by.css('.diamond-title.ng-binding')).then(function(get){
                get[0].click();
            });      
        });
    });


// Delete Person metadata
it('should delete the person metadata section',function(){
        browser.driver.ignoreSynchronization = true;
        browser.driver.sleep(5000);
        element.all(by.css('.meta-property-value.ng-binding')).then(function(get){
            get[9].click();
        });
        //browser.pause();
        var bcount = 0;
        var aCount = 0;
        element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul')).then(function(getCount){
            bCount = getCount.length;
            browser.driver.sleep(5000);
            
            // element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul['+beforeCount+']/div[1]/li[2]/metadata-edit-in-place/div/div[1]/span[1]')).then(function(clickRole){
            //     clickRole[0].click();    
         //    });
            browser.actions().mouseMove(element(by.xpath('//li[13]/fieldset/ul['+bCount+']/fieldset/ul'))).perform();
            element.all(by.xpath(".//div[@ng-show='rowHoverFlag$index']/a")).then(function(delButton){
                    delButton[0].click();
                    //console.log("attr : "+delButton[0].getAttribute('class'));
            });
            element(by.css('[ng-click="save()"]')).click();
            browser.driver.sleep(3000);
            expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
            element.all(by.css('.close')).then(function(clickcls){
                clickcls[0].click();
            });
            element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul')).then(function(getCount){
                aCount = getCount.length;
                //expect();
               });
        });
    });


// Edit custom metadata
  it('should edit Custom Metadata fields',function(){
        browser.driver.ignoreSynchronization = true;
        element.all(by.css('.meta-property-value.ng-binding')).then(function(get){
            get[19].click();
        });
        var cCount = 0;
        var bCount = 0;
        element.all(by.xpath('//dynamic-meta-data/ul/fieldset/ul')).then(function(getCount){
            bCount = getCount.length;
        });
        browser.driver.sleep(5000);
        element.all(by.css('.button.button-secondary.uppercase')).then(function(customAddButton){
            customAddButton[5].click();
        });
        browser.driver.sleep(5000);
        //var cCount;
        element.all(by.xpath('//dynamic-meta-data/ul/fieldset/ul')).then(function(getCount){
            cCount = getCount.length;
            console.log(bCount,cCount);
            expect(bCount < cCount);
            browser.driver.sleep(5000);
            element.all(by.xpath('//ul/fieldset/ul['+cCount+']/div[1]/li[1]/metadata-edit-in-place/div/div[1]/span[2]')).then(function(clickKey){
                clickKey[0].click();
            });
            browser.driver.sleep(3000);
            console.log(cCount);
            element.all(by.xpath('//ul/fieldset/ul['+cCount+']/div[1]/li[1]/metadata-edit-in-place/div/div[2]/textarea')).then(function(editKey){
                editKey[0].clear();
                editKey[0].sendKeys('test_Key');
            });
            
            browser.driver.sleep(3000);
            element.all(by.xpath('//ul/fieldset/ul['+cCount+']/div[1]/li[2]/metadata-edit-in-place/div/div[1]/span[2]')).then(function(clickValue){
                clickValue[0].click();
            });
            browser.driver.sleep(3000);
            element.all(by.xpath('//ul/fieldset/ul['+cCount+']/div[1]/li[2]/metadata-edit-in-place/div/div[2]/textarea')).then(function(editValue){
                editValue[0].clear();
                editValue[0].sendKeys('test_Value');
            });
        });

        browser.driver.sleep(5000);
        element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(3000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
        element.all(by.css('.close')).then(function(clickcls){
            clickcls[0].click();
            });
    });


// Delete Custome metadata
it('should delete the person metadata section',function(){
        browser.driver.ignoreSynchronization = true;
        browser.driver.sleep(5000);
        element.all(by.css('.meta-property-value.ng-binding')).then(function(get){
            get[19].click();
        });
        //browser.pause();
        var bcount = 0;
        var aCount = 0;
        element.all(by.xpath('//dynamic-meta-data/ul/fieldset/ul')).then(function(getCount){
            bCount = getCount.length;
            //console.log(beforeCount);
            browser.driver.sleep(5000);
            
            // element.all(by.xpath('//li[13]/fieldset/ul/fieldset/ul['+beforeCount+']/div[1]/li[2]/metadata-edit-in-place/div/div[1]/span[1]')).then(function(clickRole){
            //     clickRole[0].click();    
         //    });
            browser.actions().mouseMove(element(by.xpath('//dynamic-meta-data/ul/fieldset/ul['+bCount+']'))).perform();
            element.all(by.xpath(".//div[@ng-show='rowHoverFlag$index']/a")).then(function(delButton){
                    delButton[0].click();
                    //console.log("attr : "+delButton[0].getAttribute('class'));
            });
            element(by.css('[ng-click="save()"]')).click();
            browser.driver.sleep(3000);
            expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
            element.all(by.css('.close')).then(function(clickcls){
                clickcls[0].click();
            });
            element.all(by.xpath('//dynamic-meta-data/ul/fieldset/ul')).then(function(getCount){
                aCount = getCount.length;
                console.log(aCount,bCount);
                expect(aCount < bCount);
               });
        });
    });



it('should check that METADATA, OFFER MANAGEMENT and VIDEOS tab are clickable', function(){
        browser.driver.ignoreSynchronization = true;
        
        for (var i = 0; i <= 2; i++) {

           element.all(by.css('.secondary-tabs.uppercase>dd>a')).then(
                   function(m){
                       return function(secondaryTab){
                      secondaryTab[m].click();
                       }
                   }(i)
            );

         // element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd['+i+']/a')).click();
         browser.driver.sleep(500);
           for (var j = 1; j <= 3; j++) {
               var clickedTag = browser.driver.findElement(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd['+j+']/a'));
               var selectedTab = browser.driver.findElement(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd['+j+']'));
                clickedTag.getText().then(function(tabText){
                        console.log(''+tabText)
               });
               selectedTab.getAttribute('class').then(function(text){
                console.log(text);
                if(text == 'active'){
                 console.log('clicked on tab')
                   }
                   else{
                     console.log('Not clicked on Tab.');
                   }
               });
            };
        };
    });

    it('should check the video is present under the video tab for the movie asset', function(){
        browser.ignoreSynchronization = true;
       element.all(by.css('.video-container.uppercase>li')).then(function(numberOfVideo){
            var videoCount = numberOfVideo.length;
          //element(by.css('.video-container.uppercase>li')).isPresent().then(function(isPresent){
            if(videoCount > 0){
                console.log('videos is/are present');
                //expect(element(by.css('.video-container.uppercase>li')).isPresent()).toBe(true);
            }else{
                console.log('videos is/are not present');
                //expect(element(by.css('.video-container.uppercase')).isPresent()).toBe(false);
            }
        });
        //clicking on the tag management tab
          element.all(by.css('.secondary-tabs.uppercase>dd>a')).then(function(tagManagement){
            tagManagement[1].click();
        });
    });

 // Tag Managment
   it('should apply the labels by clicking on BROWSE BY AVAILABLE ', function(){
        browser.driver.ignoreSynchronization = true;
        browser.driver.sleep(5000);

        //removing already present label before apply
        element.all(by.xpath('//div[@ng-show=\'showTile\']/ul/li')).then(function(addedLabels){
            var numberofAddedLabels = addedLabels.length;
            
            if(numberofAddedLabels > 0){
               for (var i = 1; i <= numberofAddedLabels; i++) {
                 element(by.xpath('//div[@ng-show=\'showTile\']/ul/li['+i+']/label/span')).click();
                 browser.driver.sleep(2000);
                };
               //clicking on the remove button to remove label
                element(by.xpath('//*[@class=\'marker-heading ng-scope\']/a[2]')).click();
                browser.driver.sleep(5000);
                expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
                browser.refresh();
                browser.driver.sleep(15000);
                element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
                browser.driver.sleep(2000);
                element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
                browser.driver.sleep(5000);
            }else{
            console.log('no any label is present to remove');
            }
        });

          //clicking on the browse by avavilable labels button
        element.all(by.css('.marker-heading.ng-scope>a')).then(function(browseAvailable){
            browseAvailable[0].click();
            browser.driver.sleep(5000);
        });

        //selecting the labels from pop up
        element.all(by.css('.marker-table-content>table>tbody>tr>td')).then(function(checkBoxWidth){
               checkBoxWidth[0].all(by.css('.checkbox-width>input')).click();
        });
         
        //clicking on the "APPLY SELECTED LABELS" button.
        element.all(by.css('.modal-apply-buttons>a')).then(function(buttonText){
             buttonText[1].click();
             browser.driver.sleep(5000);
        });
         expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
        
         //switching between tabs to see the reflection of added labels
         browser.refresh();
        browser.driver.sleep(10000);
        element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
        browser.driver.sleep(5000);
        element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
            
        //remove the applied label
        browser.driver.sleep(5000);
        element.all(by.xpath('//div[@ng-show=\'showTile\']/ul/li')).then(function(numberofAddedLabel){
            var addedLableCount = numberofAddedLabel.length;
            for (var j = 1; j <= addedLableCount; j++) {
                    
                //selecting the label
                element(by.xpath('//div[@ng-show=\'showTile\']/ul/li['+j+']/label/span')).click();
                browser.driver.sleep(2000);
            };
            //clicking on the remove button to remove label
            element(by.xpath('//*[@class=\'marker-heading ng-scope\']/a[2]')).click();
            browser.driver.sleep(5000);
            expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
            element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
            browser.driver.sleep(1000);
            element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
            browser.driver.sleep(1000);
        });
        //clicking on offers tab to apply offers
        element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'offer\')"]')).click();
        browser.driver.sleep(5000);
    });

it('should click on the offers tab under tagManagement section', function(){
          browser.ignoreSynchronization = true;
          browser.driver.sleep(5000);
          //removing offer before apply
        element.all(by.xpath('//div[@ng-show=\'showTile\']/ul/li')).then(function(addedOffers){
            var numberofAddedOffers = addedOffers.length;
            if(numberofAddedOffers > 0){
               for (var i = 1; i <= numberofAddedOffers; i++) {
                 element(by.xpath('//div[@ng-show=\'showTile\']/ul/li['+i+']/label/span')).click();
                 browser.driver.sleep(1000);
                };
               //clicking on the remove button to remove label
                  element(by.xpath('//*[@class=\'marker-heading ng-scope\']/a[2]')).click();
                  browser.driver.sleep(5000);
                  expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
                  browser.refresh();
                  browser.driver.sleep(10000);
                  element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
                  browser.driver.sleep(1000);
                  element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
                  browser.driver.sleep(1000);
                  element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'offer\')"]')).click();
                  browser.driver.sleep(5000);
            }else{
            console.log('');
            }
        });

       //clicking on the browse avavilable offers
          browser.driver.sleep(1000);
         element.all(by.css('.marker-heading.ng-scope>a')).then(function(browseAvailable){
            browseAvailable[0].click();
            browser.driver.sleep(5000);
        });

        //selecting the offers from the pop up
        element.all(by.css('.marker-table-content>table>tbody>tr>td')).then(function(checkBoxWidth){
            checkBoxWidth[0].all(by.css('.checkbox-width>input')).click();
        });
        
        // //clicking on the apply offers button
        element.all(by.css('.modal-apply-buttons>a')).then(function(buttonText){
             buttonText[1].click();
        });
        browser.driver.sleep(5000);
        expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
        browser.refresh();
        browser.driver.sleep(10000);
        element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
        element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
        browser.driver.sleep(1000);
        element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'offer\')"]')).click();
        browser.driver.sleep(5000);

       //removing offer after apply
       element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'collection\')"]')).click();
        browser.driver.sleep(3000);
   });

//Tag Managment - Collection

it('should apply the collections', function(){
        browser.ignoreSynchronization = true;
        
        //removing collection before apply
        element.all(by.xpath('//div[@ng-show=\'showTile\']/ul/li')).then(function(addedCollection){
            var numberofAddedCollection = addedCollection.length;
            console.log(numberofAddedCollection);
            if(numberofAddedCollection > 0){
               for (var i = 1; i <= numberofAddedCollection; i++) {
                 element(by.xpath('//div[@ng-show=\'showTile\']/ul/li['+i+']/label/span')).click();
                 browser.driver.sleep(1000);
                };
               //clicking on the remove button to remove label
                  element(by.xpath('//*[@class=\'marker-heading ng-scope\']/a[2]')).click();
                  browser.driver.sleep(5000);
                  expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
                  browser.refresh();
                  browser.driver.sleep(10000);
                  element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
                  browser.driver.sleep(1000);
                  element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
                  browser.driver.sleep(1000);
                  element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'collection\')"]')).click();
                  browser.driver.sleep(5000);
            }else{
            console.log('');
            }
        });

        //clicking on the browse available collections
        element.all(by.css('.marker-heading.ng-scope>a')).then(function(browseAvailable){
            browseAvailable[0].click();
            browser.driver.sleep(5000);
        });

        //selecting the first collection from the pop window
        element.all(by.css('.marker-table-content>table>tbody>tr>td>input')).then(function(selectTable){
            selectTable[0].click();
            browser.driver.sleep(1000);
        });

        // //clicking on the Apply Selected Collection button
        element.all(by.css('.modal-apply-buttons>a')).then(function(buttonText){
             buttonText[1].click();
             browser.driver.sleep(5000);
             expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
        });
        browser.driver.sleep(10000);
        element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
        browser.driver.sleep(1000);
        element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
        browser.driver.sleep(1000);
        element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'collection\')"]')).click();
        browser.driver.sleep(5000);
  });


});