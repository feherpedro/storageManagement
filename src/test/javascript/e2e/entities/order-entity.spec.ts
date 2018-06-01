import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('OrderEntity e2e test', () => {

    let navBarPage: NavBarPage;
    let orderEntityDialogPage: OrderEntityDialogPage;
    let orderEntityComponentsPage: OrderEntityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderEntities', () => {
        navBarPage.goToEntity('order-entity');
        orderEntityComponentsPage = new OrderEntityComponentsPage();
        expect(orderEntityComponentsPage.getTitle())
            .toMatch(/storageManagementApp.orderEntity.home.title/);

    });

    it('should load create OrderEntity dialog', () => {
        orderEntityComponentsPage.clickOnCreateButton();
        orderEntityDialogPage = new OrderEntityDialogPage();
        expect(orderEntityDialogPage.getModalTitle())
            .toMatch(/storageManagementApp.orderEntity.home.createOrEditLabel/);
        orderEntityDialogPage.close();
    });

    it('should create and save OrderEntities', () => {
        orderEntityComponentsPage.clickOnCreateButton();
        orderEntityDialogPage.setCreateDateInput('2000-12-31');
        expect(orderEntityDialogPage.getCreateDateInput()).toMatch('2000-12-31');
        orderEntityDialogPage.setPaymentDateInput('2000-12-31');
        expect(orderEntityDialogPage.getPaymentDateInput()).toMatch('2000-12-31');
        orderEntityDialogPage.setDueDateInput('2000-12-31');
        expect(orderEntityDialogPage.getDueDateInput()).toMatch('2000-12-31');
        orderEntityDialogPage.statusSelectLastOption();
        orderEntityDialogPage.save();
        expect(orderEntityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrderEntityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-order-entity div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderEntityDialogPage {
    modalTitle = element(by.css('h4#myOrderEntityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    createDateInput = element(by.css('input#field_createDate'));
    paymentDateInput = element(by.css('input#field_paymentDate'));
    dueDateInput = element(by.css('input#field_dueDate'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreateDateInput = function(createDate) {
        this.createDateInput.sendKeys(createDate);
    };

    getCreateDateInput = function() {
        return this.createDateInput.getAttribute('value');
    };

    setPaymentDateInput = function(paymentDate) {
        this.paymentDateInput.sendKeys(paymentDate);
    };

    getPaymentDateInput = function() {
        return this.paymentDateInput.getAttribute('value');
    };

    setDueDateInput = function(dueDate) {
        this.dueDateInput.sendKeys(dueDate);
    };

    getDueDateInput = function() {
        return this.dueDateInput.getAttribute('value');
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
