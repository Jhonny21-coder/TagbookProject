package com.example.application.views.artworks;

import com.example.application.data.post.PostType;
import com.example.application.views.UploadsI18N;
import com.example.application.views.MainFeed;
import com.example.application.views.MainLayout;
import com.example.application.data.StudentInfo;
import com.example.application.services.StudentInfoService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Artwork;
import com.example.application.services.ArtworkService;
import com.example.application.config.CloudinaryService;
import com.example.application.views.BottomSheet;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.Notification.Position;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextAreaVariant;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.*;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.component.icon.*;
import com.vaadin.flow.dom.DomEventListener;
import com.vaadin.flow.dom.DomEvent;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.theme.lumo.LumoUtility;

import jakarta.annotation.security.PermitAll;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.File;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicReference;

@PermitAll
@Route("addArtwork")
public class AddArtwork extends AppLayout {

    private final StudentInfoService studentInfoService;
    private final UserServices userService;
    private final ArtworkService artworkService;
    private final CloudinaryService cloudinaryService;

    private final String ARTWORK_FOLDER = "artwork_images";

    private MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
    private Upload upload = new Upload(buffer);

    private TextArea title = new TextArea();
    private Span postButton = new Span("POST");
    private Button mainPostButton = new Button("POST");
    private FormLayout mainLayout = new FormLayout();
    private Div imageDiv = new Div();
    private Tabs backgroundTabs;
    private String background = "";

    public AddArtwork(StudentInfoService studentInfoService, UserServices userService, ArtworkService artworkService, CloudinaryService cloudinaryService) {
        this.studentInfoService = studentInfoService;
	this.userService = userService;
	this.artworkService = artworkService;
	this.cloudinaryService = cloudinaryService;
	addClassName("add-artwork-app-layout");

	title.setPlaceholder("What's on your mind?");
	title.addClassName("add-artwork-area");
	upload.addClassName("artwork-upload");
	mainPostButton.addClassName("add-main-post-button");
	imageDiv.addClassName("add-post-image-div");

	createHeader();
	configureUpload();

        postButton.addClickListener(event -> {
            MemoryBuffer buffer = (MemoryBuffer) upload.getReceiver();
            String emailValue = userService.findCurrentUser().getEmail();
            String titleValue = title.getValue();
            boolean hasBackground = background != null && !background.isEmpty();
            boolean hasTitle = titleValue != null && !titleValue.isEmpty();

            if (!hasTitle) {
                Notification.show("Title cannot be empty", 1000, Notification.Position.MIDDLE).addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            if (hasBackground) {
                PostType postType = background.equalsIgnoreCase("white") ? PostType.TEXT : PostType.TEXT_BACKGROUND;
                artworkService.savePost(emailValue, titleValue, background, postType);
                UI.getCurrent().navigate(MainFeed.class);
                return;
            }

            postImage(emailValue, titleValue);
        });

	// Background Tabs
	backgroundTabs = createBackgroundTabs();

	mainLayout.addClassName("add-post-main-layout");
        mainLayout.add(createProfileHeader(), title, backgroundTabs, createOtherActions());

	VerticalLayout artworksDiv = new VerticalLayout(mainLayout);
	setContent(artworksDiv);
    }

    private void configureUpload() {
    	int maxFileSizeInBytes = 1024 * 1024 * 1024; // 1GB
    	upload.setMaxFileSize(maxFileSizeInBytes);
    	upload.setAcceptedFileTypes("image/png", "image/jpeg", "image/jpg", "video/mp4");
    	upload.addSucceededListener(event -> {
    	    String fileName = event.getFileName(); // Get the current file
    	    try {
            	InputStream inputStream = buffer.getInputStream(fileName);
            	byte[] bytes = inputStream.readAllBytes();

        	StreamResource resource = new StreamResource(fileName, () -> new ByteArrayInputStream(bytes));

	        Image image = new Image(resource, fileName);
	        image.addClassName("add-post-image");

	        EditImage editImage = new EditImage(mainLayout);
                editImage.addClassName("add-artwork-edit-main");

                Image imageToEdit = new Image(resource, fileName);
                configureEditImage(editImage, imageToEdit);

		Icon editIcon = new Icon("vaadin", "pencil");
		editIcon.addClickListener(e -> editImage.open());

		Icon removeIcon = new Icon("vaadin", "trash");

		Div clickableImage = new Div(image);
		clickableImage.addClickListener(e -> editImage.open());

		Div wrappedImage = new Div(clickableImage, new Div(editIcon, removeIcon));

		BottomSheet bottomSheet = createBottomSheet(resource, wrappedImage, fileName);

		removeIcon.addClickListener(e -> {
		    bottomSheet.open();
		});

		imageDiv.add(wrappedImage);
	        mainLayout.add(bottomSheet);
	    } catch (IOException e) {
	        Notification.show("Error uploading artwork image", 3000, Notification.Position.TOP_CENTER);
	    }

	    mainLayout.remove(backgroundTabs);
	    mainLayout.addComponentAtIndex(2, imageDiv);
	});

	upload.addAllFinishedListener(event -> {
	    title.setClassName("add-post-text-area-with-image");
	});
    }

    // Method to configure layout for editing the image
    private void configureEditImage(EditImage editImage, Image imageToEdit) {
    	Icon closeIcon = new Icon("lumo", "cross");
    	closeIcon.addClickListener(event -> editImage.close());

    	Div stickersDiv = createEditAction("stickers", "Stickers");
    	Div textDiv = createEditAction("text", "Text");

    	editImage.setHeader(
    	    new HorizontalLayout(
    	    	closeIcon,
    	    	new Div(stickersDiv, textDiv)
    	    )
    	);

    	editImage.addContent(imageToEdit);

    	editImage.setFooter(
    	    new Div(
    	    	new Button("Done", e -> {
    	    	    editImage.close();
    		})
    	    )
    	);
    }

    // Method to create an action for editing image
    private Div createEditAction(String iconName, String text) {
    	return new Div(new Span(text), getIcon(iconName));
    }

    // Method to create a Bottom Sheet for to confirm removing the image
    private BottomSheet createBottomSheet(StreamResource resource, Div wrappedImage, String fileName) {
    	BottomSheet bottomSheet = new BottomSheet();

    	Image imageToRemove = new Image(resource, "");

    	Div informationDiv = new Div(new Span("Remove photo?"), new Span("You'll lose this picture and any changes you've made to it."));
    	Div imageInformationDiv = new Div(imageToRemove, informationDiv);

    	Div lineDiv = new Div();

    	Div keepEditingDiv = new Div(new Icon("vaadin", "pencil"), new Span("Keep editing"));
    	keepEditingDiv.addClickListener(event -> bottomSheet.close());

    	Div removePhotoDiv = new Div(new Icon("vaadin", "trash"), new Span("Remove photo"));
    	removePhotoDiv.addClickListener(event -> {
    	    imageDiv.remove(wrappedImage);
            buffer.getFiles().remove(fileName);
    	    bottomSheet.close();

    	    if (buffer.getFiles().size() < 1) {
    	    	mainLayout.remove(imageDiv);
            	mainLayout.addComponentAtIndex(2, backgroundTabs);
            	title.setClassName("add-artwork-area");
    	    }
    	});

    	Div mainDiv = new Div(imageInformationDiv, lineDiv, keepEditingDiv, removePhotoDiv);
    	mainDiv.addClassName("add-post-remove-main-div");

    	bottomSheet.addContent(mainDiv);
    	return bottomSheet;
    }

    private Div createActionDiv(String iconName, String text) {
    	Div actionDiv = new Div(getIcon(iconName), new Span(text));
    	return actionDiv;
    }

    private Div createOtherActions() {
   	Div photosDiv = new Div(getIcon("photos"), new Span("Photos/videos"));

   	Button uploadButton = new Button();
   	uploadButton.addClassName("post-add-photos-button");
        uploadButton.getElement().appendChild(photosDiv.getElement());
	upload.setUploadButton(uploadButton);

   	Div tagPeopleDiv = new Div(getIcon("tag-people"), new Span("Tag people"));
   	Div locationDiv = new Div(getIcon("location"), new Span("Add location"));
   	Div feelingDiv = new Div(getIcon("feeling"), new Span("Feeling/activity"));
   	Div eventDiv = new Div(getIcon("event"), new Span("Create event"));
   	Div liveDiv = new Div(getIcon("live"), new Span("Go live"));

   	Div actionsDiv = new Div(upload, tagPeopleDiv, locationDiv, feelingDiv, eventDiv, liveDiv, mainPostButton);
   	actionsDiv.addClassName("add-post-actions-div");
   	return actionsDiv;
    }

    private SvgIcon getIcon(String iconName) {
        return new SvgIcon(new StreamResource(iconName + ".svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/" + iconName + ".svg")));
    }

    private Tabs createBackgroundTabs() {
   	// Create an array of tab data with corresponding styles and backgrounds
	TabData[] tabData = {
	    new TabData(new Tab(new Div()), "white-area", "white", false),
	    new TabData(new Tab(new Div()), "purple-area", "#C500FF", true),
	    new TabData(new Tab(new Div()), "red-area", "#E2013B", true),
	    new TabData(new Tab(new Div()), "black-area", "black", true),
	    new TabData(new Tab(new Div()), "gradient1-area", "1", true),
	    new TabData(new Tab(new Div()), "gradient2-area", "2", true),
	    new TabData(new Tab(new Div()), "gradient3-area", "3", true),
	    new TabData(new Tab(new Div()), "gradient4-area", "4", true)
	};

	// Create tabs dynamically
	Tabs tabs = new Tabs(Arrays.stream(tabData).map(data -> data.tab).toArray(Tab[]::new));
	tabs.addClassName("add-artwork-background-tabs");

	background = "white"; // Default background value

	// Add a listener to update the style based on the selected tab
	tabs.addSelectedChangeListener(event -> {
	    Tab selectedTab = tabs.getSelectedTab();

	    for (TabData data : tabData) {
	        if (data.tab.equals(selectedTab)) {
	            title.setClassName(data.cssClass);
	            background = data.background;

	            if (data.centerAlign) {
	                title.addThemeVariants(TextAreaVariant.LUMO_ALIGN_CENTER);
	                title.addClassNames(LumoUtility.JustifyContent.CENTER);
	            } else {
	                title.removeThemeVariants(TextAreaVariant.LUMO_ALIGN_CENTER);
	                title.removeClassNames(LumoUtility.JustifyContent.CENTER);
	            }
	            break;
	        }
	    }
	});

   	mainPostButton.addClickListener(event -> {
    	    String emailValue = userService.findCurrentUser().getEmail();
    	    String titleValue = title.getValue();
    	    boolean hasBackground = !background.equals("white");
    	    boolean hasTitle = titleValue != null && !titleValue.isEmpty();

    	    if (!hasTitle) {
        	Notification.show("Title cannot be empty", 1000, Notification.Position.MIDDLE).addThemeVariants(NotificationVariant.LUMO_ERROR);
        	return;
     	    }

    	    if (hasBackground) {
    	    	PostType postType = background.equalsIgnoreCase("white") ? PostType.TEXT : PostType.TEXT_BACKGROUND;
        	artworkService.savePost(emailValue, titleValue, background, postType);
        	UI.getCurrent().navigate(MainFeed.class);
        	return;
    	    }

    	    postImage(emailValue, titleValue);
	});
   	return tabs;
    }

    // Method to post an image
    private void postImage(String emailValue, String titleValue) {
    	List<String> uploadImages = new ArrayList<>();

    	buffer.getFiles().forEach(fileName -> {
   	    try (InputStream inputStream = buffer.getInputStream(fileName)) {
	    	// Save uploaded image to a temporary file
            	File tempFile = File.createTempFile(fileName, ".png");
            	tempFile.deleteOnExit();

            	try (FileOutputStream fos = new FileOutputStream(tempFile)) {
		    fos.write(inputStream.readAllBytes());
            	}

            	String imageUrl = cloudinaryService.uploadImage(tempFile, ARTWORK_FOLDER);
            	uploadImages.add(imageUrl);
	    } catch (Exception e) {
            	System.out.println(e.getMessage());
	    }
	});
	mainPostButton.setText("Uploading...");
	artworkService.saveArtwork(emailValue, uploadImages, titleValue, PostType.IMAGE);
        UI.getCurrent().navigate(MainFeed.class);
    }

    private static class TabData {
    	Tab tab;
    	String cssClass;
    	String background;
    	boolean centerAlign;

    	TabData(Tab tab, String cssClass, String background, boolean centerAlign) {
            this.tab = tab;
            this.cssClass = cssClass;
            this.background = background;
            this.centerAlign = centerAlign;
    	}
    }

    private HorizontalLayout createProfileHeader(){
   	User user = userService.findCurrentUser();

   	String imageUrl = user.getProfileImage();

   	Avatar avatar = new Avatar();
   	avatar.setImage(imageUrl);
	avatar.addClassName("add-artwork-avatar");

	Span name = new Span(user.getFullName());
	name.addClassName("add-artwork-name");

	Button privacyButton = new Button("Friends", new Icon("vaadin", "group"));
	privacyButton.setSuffixComponent(new Icon("lumo", "chevron-down"));
	privacyButton.addClassName("add-artwork-privacy-button");

	HorizontalLayout layout = new HorizontalLayout(avatar, new Div(name, privacyButton));
	layout.addClassName("add-artwork-layout");

	return layout;
    }

    private void createHeader(){
        Icon backButton = new Icon(VaadinIcon.ARROW_BACKWARD);
        backButton.addClassName("profile-back-button");
        backButton.addClickListener(event -> {
             UI.getCurrent().navigate(MainFeed.class);
        });

        Span text = new Span("Post an artwork");
        text.addClassName("add-artwork-header-text");

        postButton.addClassName("post-button");

        addToNavbar(new HorizontalLayout(backButton, text, postButton));
    }
}
