import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StockTakingItem e2e test', () => {

    let navBarPage: NavBarPage;
    let stockTakingItemDialogPage: StockTakingItemDialogPage;
    let stockTakingItemComponentsPage: StockTakingItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StockTakingItems', () => {
        navBarPage.goToEntity('stock-taking-item');
        stockTakingItemComponentsPage = new StockTakingItemComponentsPage();
        expect(stockTakingItemComponentsPage.getTitle())
            .toMatch(/storageManagementApp.stockTakingItem.home.title/);

    });

    it('should load create StockTakingItem dialog', () => {
        stockTakingItemComponentsPage.clickOnCreateButton();
        stockTakingItemDialogPage = new StockTakingItemDialogPage();
        expect(stockTakingItemDialogPage.getModalTitle())
            .toMatch(/storageManagementApp.stockTakingItem.home.createOrEditLabel/);
        stockTakingItemDialogPage.close();
    });

    it('should create and save StockTakingItems', () => {
        stockTakingItemComponentsPage.clickOnCreateButton();
        stockTakingItemDialogPage.setOldQuantityInput('5');
        expect(stockTakingItemDialogPage.getOldQuantityInput()).toMatch('5');
        stockTakingItemDialogPage.setNewQuantityInput('5');
        expect(stockTakingItemDialogPage.getNewQuantityInput()).toMatch('5');
        stockTakingItemDialogPage.setDifferenceInput('5');
        expect(stockTakingItemDialogPage.getDifferenceInput()).toMatch('5');
        stockTakingItemDialogPage.stockTakingSelectLastOption();
        stockTakingItemDialogPage.productSelectLastOption();
        stockTakingItemDialogPage.statusSelectLastOption();
        stockTakingItemDialogPage.save();
        expect(stockTakingItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StockTakingItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stock-taking-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StockTakingItemDialogPage {
    modalTitle = element(by.css('h4#myStockTakingItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    oldQuantityInput = element(by.css('input#field_oldQuantity'));
    newQuantityInput = element(by.css('input#field_newQuantity'));
    differenceInput = element(by.css('input#field_difference'));
    stockTakingSelect = element(by.css('select#field_stockTaking'));
    productSelect = element(by.css('select#field_product'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setOldQuantityInput = function(oldQuantity) {
        this.oldQuantityInput.sendKeys(oldQuantity);
    };

    getOldQuantityInput = function() {
        return this.oldQuantityInput.getAttribute('value');
    };

    setNewQuantityInput = function(newQuantity) {
        this.newQuantityInput.sendKeys(newQuantity);
    };

    getNewQuantityInput = function() {
        return this.newQuantityInput.getAttribute('value');
    };

    setDifferenceInput = function(difference) {
        this.differenceInput.sendKeys(difference);
    };

    getDifferenceInput = function() {
        return this.differenceInput.getAttribute('value');
    };

    stockTakingSelectLastOption = function() {
        this.stockTakingSelect.all(by.tagName('option')).last().click();
    };

    stockTakingSelectOption = function(option) {
        this.stockTakingSelect.sendKeys(option);
    };

    getStockTakingSelect = function() {
        return this.stockTakingSelect;
    };

    getStockTakingSelectedOption = function() {
        return this.stockTakingSelect.element(by.css('option:checked')).getText();
    };

    productSelectLastOption = function() {
        this.productSelect.all(by.tagName('option')).last().click();
    };

    productSelectOption = function(option) {
        this.productSelect.sendKeys(option);
    };

    getProductSelect = function() {
        return this.productSelect;
    };

    getProductSelectedOption = function() {
        return this.productSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    };

    statusSelectOption = function(option) {
        this.statusSelect.sendKeys(option);
    };

    getStatusSelect = function() {
        return this.statusSelect;
    };

    getStatusSelectedOption = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
