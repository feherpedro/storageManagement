import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle())
            .toMatch(/storageManagementApp.product.home.title/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle())
            .toMatch(/storageManagementApp.product.home.createOrEditLabel/);
        productDialogPage.close();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setNameInput('name');
        expect(productDialogPage.getNameInput()).toMatch('name');
        productDialogPage.setPriceInput('5');
        expect(productDialogPage.getPriceInput()).toMatch('5');
        productDialogPage.setQuantityInput('5');
        expect(productDialogPage.getQuantityInput()).toMatch('5');
        productDialogPage.setUnitOfMeasurementInput('unitOfMeasurement');
        expect(productDialogPage.getUnitOfMeasurementInput()).toMatch('unitOfMeasurement');
        productDialogPage.setBarcodeInput('barcode');
        expect(productDialogPage.getBarcodeInput()).toMatch('barcode');
        productDialogPage.productCategorySelectLastOption();
        productDialogPage.priceCategorySelectLastOption();
        productDialogPage.statusSelectLastOption();
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    priceInput = element(by.css('input#field_price'));
    quantityInput = element(by.css('input#field_quantity'));
    unitOfMeasurementInput = element(by.css('input#field_unitOfMeasurement'));
    barcodeInput = element(by.css('input#field_barcode'));
    productCategorySelect = element(by.css('select#field_productCategory'));
    priceCategorySelect = element(by.css('select#field_priceCategory'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    };

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    };

    setQuantityInput = function(quantity) {
        this.quantityInput.sendKeys(quantity);
    };

    getQuantityInput = function() {
        return this.quantityInput.getAttribute('value');
    };

    setUnitOfMeasurementInput = function(unitOfMeasurement) {
        this.unitOfMeasurementInput.sendKeys(unitOfMeasurement);
    };

    getUnitOfMeasurementInput = function() {
        return this.unitOfMeasurementInput.getAttribute('value');
    };

    setBarcodeInput = function(barcode) {
        this.barcodeInput.sendKeys(barcode);
    };

    getBarcodeInput = function() {
        return this.barcodeInput.getAttribute('value');
    };

    productCategorySelectLastOption = function() {
        this.productCategorySelect.all(by.tagName('option')).last().click();
    };

    productCategorySelectOption = function(option) {
        this.productCategorySelect.sendKeys(option);
    };

    getProductCategorySelect = function() {
        return this.productCategorySelect;
    };

    getProductCategorySelectedOption = function() {
        return this.productCategorySelect.element(by.css('option:checked')).getText();
    };

    priceCategorySelectLastOption = function() {
        this.priceCategorySelect.all(by.tagName('option')).last().click();
    };

    priceCategorySelectOption = function(option) {
        this.priceCategorySelect.sendKeys(option);
    };

    getPriceCategorySelect = function() {
        return this.priceCategorySelect;
    };

    getPriceCategorySelectedOption = function() {
        return this.priceCategorySelect.element(by.css('option:checked')).getText();
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
