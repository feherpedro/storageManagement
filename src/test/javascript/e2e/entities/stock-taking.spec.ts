import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StockTaking e2e test', () => {

    let navBarPage: NavBarPage;
    let stockTakingDialogPage: StockTakingDialogPage;
    let stockTakingComponentsPage: StockTakingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StockTakings', () => {
        navBarPage.goToEntity('stock-taking');
        stockTakingComponentsPage = new StockTakingComponentsPage();
        expect(stockTakingComponentsPage.getTitle())
            .toMatch(/storageManagementApp.stockTaking.home.title/);

    });

    it('should load create StockTaking dialog', () => {
        stockTakingComponentsPage.clickOnCreateButton();
        stockTakingDialogPage = new StockTakingDialogPage();
        expect(stockTakingDialogPage.getModalTitle())
            .toMatch(/storageManagementApp.stockTaking.home.createOrEditLabel/);
        stockTakingDialogPage.close();
    });

    it('should create and save StockTakings', () => {
        stockTakingComponentsPage.clickOnCreateButton();
        stockTakingDialogPage.setStockTakingDateInput('2000-12-31');
        expect(stockTakingDialogPage.getStockTakingDateInput()).toMatch('2000-12-31');
        stockTakingDialogPage.statusSelectLastOption();
        stockTakingDialogPage.save();
        expect(stockTakingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StockTakingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stock-taking div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StockTakingDialogPage {
    modalTitle = element(by.css('h4#myStockTakingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    stockTakingDateInput = element(by.css('input#field_stockTakingDate'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStockTakingDateInput = function(stockTakingDate) {
        this.stockTakingDateInput.sendKeys(stockTakingDate);
    };

    getStockTakingDateInput = function() {
        return this.stockTakingDateInput.getAttribute('value');
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
