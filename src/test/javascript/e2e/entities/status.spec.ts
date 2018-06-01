import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Status e2e test', () => {

    let navBarPage: NavBarPage;
    let statusDialogPage: StatusDialogPage;
    let statusComponentsPage: StatusComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Statuses', () => {
        navBarPage.goToEntity('status');
        statusComponentsPage = new StatusComponentsPage();
        expect(statusComponentsPage.getTitle())
            .toMatch(/storageManagementApp.status.home.title/);

    });

    it('should load create Status dialog', () => {
        statusComponentsPage.clickOnCreateButton();
        statusDialogPage = new StatusDialogPage();
        expect(statusDialogPage.getModalTitle())
            .toMatch(/storageManagementApp.status.home.createOrEditLabel/);
        statusDialogPage.close();
    });

    it('should create and save Statuses', () => {
        statusComponentsPage.clickOnCreateButton();
        statusDialogPage.setNameInput('name');
        expect(statusDialogPage.getNameInput()).toMatch('name');
        statusDialogPage.setCodeInput('code');
        expect(statusDialogPage.getCodeInput()).toMatch('code');
        statusDialogPage.save();
        expect(statusDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StatusComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-status div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StatusDialogPage {
    modalTitle = element(by.css('h4#myStatusLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    codeInput = element(by.css('input#field_code'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    };

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
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
