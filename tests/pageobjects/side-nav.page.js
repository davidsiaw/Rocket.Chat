import Page from './Page';

class SideNav extends Page {
	get directMessageTarget() { return browser.element('.flex-nav input#who'); }
	get saveDirectMessageBtn() { return browser.element('.save-direct-message'); }

	get channelType() { return browser.element('label[for="channel-type"]'); }
	get channelReadOnly() { return browser.element('label[for="channel-ro"]'); }
	get channelName() { return browser.element('#channel-name'); }
	get saveChannelBtn() { return browser.element('.save-channel'); }

	get messageInput() { return browser.element('.input-message'); }

	get accountBoxUserName() { return browser.element('.account-box .data h4'); }
	get accountBoxUserAvatar() { return browser.element('.account-box .avatar-image'); }

	get newChannelBtn() { return browser.element('.rooms-list .add-room:nth-of-type(1)'); }
	get newChannelIcon() { return browser.element('.rooms-list .add-room:nth-of-type(1) .icon-plus'); }
	get moreChannels() { return browser.element('.rooms-list .more-channels'); }

	get newDirectMessageBtn() { return browser.element('.rooms-list .add-room:nth-of-type(2)'); }
	get newDirectMessageIcon() { return browser.element('.rooms-list .add-room:nth-of-type(2) .icon-plus'); }
	get moreDirectMessages() { return browser.element('.rooms-list .more-direct-messages'); }

	get general() { return browser.element('.rooms-list > .wrapper > ul [title="general"]'); }
	get channelHoverIcon() { return browser.element('.rooms-list > .wrapper > ul [title="general"] .icon-eye-off'); }

	get userOptions() { return browser.element('.options'); }
	get statusOnline() { return browser.element('.online'); }
	get statusAway() { return browser.element('.away'); }
	get statusBusy() { return browser.element('.busy'); }
	get statusOffline() { return browser.element('.offline'); }
	get account() { return browser.element('#account'); }
	get admin() { return browser.element('#admin'); }
	get logout() { return browser.element('#logout'); }
	get sideNavBar() { return browser.element('.side-nav '); }

	get preferences() { return browser.element('.account-link:nth-of-type(1)'); }
	get profile() { return browser.element('.account-link:nth-of-type(2)'); }
	get avatar() { return browser.element('.account-link:nth-of-type(3)'); }
	get preferencesClose() { return browser.element('.side-nav .arrow.close'); }

	openChannel(channelName) {
		browser.click('.rooms-list > .wrapper > ul [title="'+channelName+'"]');
		this.messageInput.waitForExist(5000);
		browser.waitUntil(function() {
			return browser.getText('.room-title') === channelName;
		}, 5000);
	}

	getChannelFromList(channelName) {
		return browser.element('.rooms-list > .wrapper > ul [title="'+channelName+'"]');
	}

	createChannel(channelName, isPrivate, isReadOnly) {
		this.newChannelBtn.waitForVisible(10000);
		this.newChannelBtn.click();
		this.channelType.waitForVisible(10000);
		this.channelName.setValue(channelName);
		if (isPrivate) {
			this.channelType.click();
		}
		if (isReadOnly) {
			this.channelReadOnly.click();
		}
		browser.pause(500);
		this.saveChannelBtn.click();
		browser.pause(500);
		browser.waitForExist('[title="'+channelName+'"]', 1000);
		this.channelType.waitForVisible(500, true);
	}

	addPeopleToChannel(user) {
		this.membersTab.click();
		this.userSearchBar.waitForVisible();
		this.userSearchBar.setValue(user);
		browser.waitForVisible('.-autocomplete-item');
		browser.click('.-autocomplete-item');
	}

	removePeopleFromChannel(user) {
		this.membersTab.click();
		browser.waitForVisible('[title="'+user+'"]');
		browser.click('[title="'+user+'"]');
		this.removeUserBtn.click();
	}

	startDirectMessage(user) {
		this.newDirectMessageBtn.waitForVisible(3000);
		this.newDirectMessageBtn.click();
		this.directMessageTarget.waitForVisible(3000);
		this.directMessageTarget.setValue(user);
		browser.waitForVisible('.-autocomplete-item', 3000);
		browser.click('.-autocomplete-item');
		browser.pause(200);
		this.saveDirectMessageBtn.click();
		browser.waitForExist('[title="'+user+'"]');
	}
}

module.exports = new SideNav();
