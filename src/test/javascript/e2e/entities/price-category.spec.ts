import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PriceCategory e2e test', () => {

    let navBarPage: NavBarPage;
    let priceCategoryDialogPage: PriceCategoryDialogPage;
    let priceCategoryComponentsPage: PriceCategoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PriceCategories', () => {
        navBarPage.goToEntity('price-category');
        priceCategoryComponentsPage = new PriceCategoryComponentsPage();
        expect(priceCategoryComponentsPage.getTitle())
            .toMatch(/storageManagementApp.priceCategory.home.title/);

    });

    it('should load create PriceCategory dialog', () => {
        priceCategoryComponentsPage.clickOnCreateButton();
        priceCategoryDialogPage = new PriceCategoryDialogPage();
        expect(priceCategoryDialogPage.getModalTitle())
            .toMatch(/storageManagementApp.priceCategory.home.createOrEditLabel/);
        priceCategoryDialogPage.close();
    });

    it('should create and save PriceCategories', () => {
        priceCategoryComponentsPage.clickOnCreateButton();
        priceCategoryDialogPage.setNameInput('name');
        expect(priceCategoryDialogPage.getNameInput()).toMatch('name');
        priceCategoryDialogPage.setPriceInput('5');
        expect(priceCategoryDialogPage.getPriceInput()).toMatch('5');
        priceCategoryDialogPage.save();
        expect(priceCategoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PriceCategoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-price-category div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PriceCategoryDialogPage {
    modalTitle = element(by.css('h4#myPriceCategoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    priceInput = element(by.css('input#field_price'));

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
