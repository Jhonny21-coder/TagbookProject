package com.example.application.views.chat.privacysafety.blockedaccounts;

import com.example.application.data.User;
import com.example.application.data.Block;
import com.example.application.data.dto.block.BlockedUserDTO;
import com.example.application.services.UserServices;
import com.example.application.services.BlockService;

import com.example.application.views.chat.privacysafety.PrivacySafetyView;
import com.example.application.views.chat.BlockView;
import com.example.application.views.chat.ChatUtils;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinSession;

import jakarta.annotation.security.PermitAll;

import java.util.List;

@PermitAll
@Route("blockedAccounts")
public class BlockedAccountsView extends AppLayout {

    private final UserServices userService;
    private final BlockService blockService;

    public BlockedAccountsView(UserServices userService, BlockService blockService) {
    	this.userService = userService;
    	this.blockService = blockService;
    	addClassName("message-settings-app-layout");
    	createHeader();
    	createMainLayout();
    }

    private void createMainLayout() {
    	User currentUser = userService.findCurrentUser();

    	Div mainLayout = new Div();
    	mainLayout.addClassName("blocked-accounts-main-layout");

	List<BlockedUserDTO> blockedUsers = blockService.getBlockedUsersByBlockerId(currentUser.getId());
	blockedUsers.forEach(blockedUserDTO -> {
    	    Avatar avatar = new Avatar("", blockedUserDTO.getProfileImage());
    	    Span fullNameSpan = new Span(ChatUtils.truncate(blockedUserDTO.getFullName(), 21));
    	    Span blockTypeSpan = new Span(blockedUserDTO.getBlockType());

    	    Button unblockButton = new Button("Unblock", e -> {
        	VaadinSession.getCurrent().getSession().setAttribute("blockedAccounts", blockedUserDTO.getId());
        	UI.getCurrent().navigate(BlockView.class, blockedUserDTO.getId());
    	    });

    	    Div blockDiv = new Div(new Div(avatar, new Div(fullNameSpan, blockTypeSpan)), unblockButton);
    	    blockDiv.addClassName("blocked-accounts-div");

    	    mainLayout.add(blockDiv);
	});

    	setContent(mainLayout);
    }

    private void createHeader() {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(PrivacySafetyView.class);
        });

        Icon addIcon = new Icon("lumo", "plus");
        addIcon.addClickListener(event -> {
            UI.getCurrent().navigate(BlockAnAccountView.class);
        });

        HorizontalLayout headerLayout = new HorizontalLayout(new Div(backIcon, new Span("Blocked accounts")), addIcon);
        headerLayout.addClassName("blocked-accounts-header-layout");

        addToNavbar(headerLayout);
   }
}
