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

	
	it('should click on the status option in filter and select video', function(){
   browser.ignoreSynchronization = true;
   browser.driver.sleep(6000);
      element(by.xpath('//dl[@class=\'accordion\']/dd[1]/a/div')).click();
   browser.driver.sleep(5000);
   element(by.xpath('//dl[@class=\'accordion\']/dd[1]/div/div[1]/ul/li[6]/a')).click();
   browser.driver.sleep(5000);
 });
    
 
  it('should hover on Video to click asset details button', function(){
        browser.driver.ignoreSynchronization =  true;
        browser.driver.sleep(5000);
        var totalAsset = 0;
        element.all(by.css('.button.dropdown.secondary.ng-binding.ng-isolate-scope')).then(function(sortDD){
          sortDD[1].click();
          element.all(by.xpath('//div[@class=\'top-btn-div-drpdwn\']/ul/li/a')).then(function(recentlyAdded){
             recentlyAdded[1].click();
             browser.driver.sleep(5000);
          });
        });
   
      element.all(by.xpath('//div[3]/div/div[1]/div/div[2]/div/div[2]/div[2]/table/tbody/tr[1]/td[1]/div[1]/input')).then(function(selectAsset){
        selectAsset[0].click();
        browser.driver.sleep(5000);
      });
      
      element.all(by.xpath('//div[3]/div/div[1]/div/div[2]/div/div[2]/div[2]/table/tbody/tr[1]/td[2]/div[3]/div/a')).then(function(assetDetails){
        assetDetails[0].click();
        browser.driver.sleep(3000);
        expect(browser.driver.getCurrentUrl()).toContain('/asset-details');
      });    
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
      }); expect(browser.driver.getCurrentUrl()).toContain('/movie-details');
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


it('should Checked the Edit Video Metadata field "Embed Code" is locked', function(){
      browser.ignoreSynchronization = true;
      browser.driver.findElement(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
      browser.driver.sleep(3000);
      element.all(by.binding('value')).then(function(edit){
          browser.actions().mouseMove(edit[0]).perform();
          browser.driver.sleep(3000);
          expect(element(by.xpath('.//li[1]/non-editable-key/div/img')).isDisplayed()).toBeTruthy(); 
        });     
  });   


  it('should Checked the Edit Video Metadata field "State" is locked', function(){
      browser.ignoreSynchronization = true;
      browser.driver.findElement(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
      browser.driver.sleep(3000);
      element.all(by.binding('value')).then(function(edit){
          browser.actions().mouseMove(edit[1]).perform();
          browser.driver.sleep(3000);
          expect(element(by.xpath('.//li[2]/non-editable-key/div/img')).isDisplayed()).toBeTruthy(); 
        }); 
  });   


    it('should Checked the Edit Video Metadata field "Publishing Rule ID" is locked', function(){
      browser.ignoreSynchronization = true;
      browser.driver.findElement(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
      browser.driver.sleep(3000);
      element.all(by.binding('value')).then(function(edit){
          browser.actions().mouseMove(edit[3]).perform();
          browser.driver.sleep(3000);
          expect(element(by.xpath('.//li[4]/non-editable-key/div/img')).isDisplayed()).toBeTruthy(); 
        }); 
    });   

    it('should Checked the Edit Video Metadata field "Asset URL" is locked', function(){
      browser.ignoreSynchronization = true;
      browser.driver.findElement(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
      browser.driver.sleep(3000);
      element.all(by.binding('value')).then(function(edit){
          browser.actions().mouseMove(edit[4]).perform();
          browser.driver.sleep(3000);
          expect(element(by.xpath('.//li[5]/non-editable-key/div/img')).isDisplayed()).toBeTruthy(); 
        });    
    });      


  it('should Checked the Edit Video Metadata field - Rejection reason', function(){
      browser.ignoreSynchronization = true;
      browser.driver.findElement(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[2]/a')).click();
      browser.driver.sleep(5000);
      element.all(by.binding('value')).then(function(edit){
             edit[2].click();
             element.all(by.model('value')).then(function(edits){
                 edits[0].clear();
                 var today = new Date(),
                 timeStamp = today.getHours() + '/' + today.getMinutes() + '/20' + today.getSeconds();
                 edits[0].sendKeys('Rejct'+timeStamp);
            });
        });     
        browser.driver.sleep(1000);
        element(by.css('[ng-click="save()"]')).click();
        browser.driver.sleep(4000);
    //  expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy(); 
        expect($('.alert-box.ng-isolate-scope.alert').isDisplayed()).toBeTruthy(); 
  });           


 it('should apply the labels by clicking on BROWSE BY AVAILABLE', function(){
       browser.driver.ignoreSynchronization = true;
       element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
       browser.driver.sleep(5000);

       //removing already present label before apply
       element.all(by.xpath('//div[@ng-show=\'showTile\']/ul/li')).then(function(addedLabels){
       var numberofAddedLabels = addedLabels.length;
       console.log('numberofAddedLabels'+numberofAddedLabels);
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
               browser.driver.sleep(10000);
               element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
               browser.driver.sleep(10000);
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
       browser.driver.sleep(10000);
       });
       expect($('.alert-box.ng-isolate-scope.success').isDisplayed()).toBeTruthy();
       
        //switching between tabs to see the reflection of added labels
       browser.refresh();
       browser.driver.sleep(10000);
       element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
       
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
            browser.refresh();
          browser.driver.sleep(5000);
       });

       //clicking on collection tab 
      
       element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
       browser.driver.sleep(5000);
      element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'collection\')"]')).click();
      browser.driver.sleep(3000);
   });


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
                 browser.driver.sleep(10000);
                 element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'collection\')"]')).click();
                 browser.driver.sleep(5000);
           }else{
           console.log('no any collection is present to remove');
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

       browser.driver.sleep(5000);
        //switching between tabs to see the reflection of added labels
       browser.refresh();
       browser.driver.sleep(15000);
       element(by.xpath('//dl[@class=\'secondary-tabs uppercase\']/dd[3]/a')).click();
       browser.driver.sleep(1000);
       element(by.xpath('//a[@ng-click="handleTagMgmtToggle(\'collection\')"]')).click();
       browser.driver.sleep(5000);
   }); 

});