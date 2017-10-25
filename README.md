## Accelerate Prep Work: My first website (updated 25-10-2017)
My website is a simple one that consist of 5 pages (mainly built from bootstrap and jQuery):
1. _Welcome page_
   * The barebone of the webpage is here with links to the other 4 pages
   * The 4 pages link has an overlay on top of it which has a title, a description and a GO link button
   * At the bottom there is a 3 icons that link to facebook, linkedln and github.
   * There is a setting icon which collapse a setting bar with a slide that can change the size of the font of the pages.  This function excludes the navBar and the footer due to scaling issue.  The font size are loaded on an object with 2 standard size set for 2 different size screen (Large or small (>768)).  When the page is loaded the setting is loaded onto the main parts of the pags and that base value is stored in a global variable which is used to adjust the font size when the slider bar is moved.
   * There are also 3 buttons of 3 different kinds of navbar and footer color and font theme, with some also changing the theme of the body.  These variables are also stored in an object in the JS which is loaded to the page at start and adjusted when the buttons are pressed. All sites share this functionality.
2. _About me_
   * The content are basically something that was copied over from my previous site but the layout is different.  There are 4 sections now which is easier to scale the words for mobile purpose.
   * For this and all the other pages except the front page, the navBar is hidden and replaced by an icon when the screen size is below 768px.
3. _Photo Album_
   * The header and footer in this page is the same as ones found in the other 2 pages (header not included in welcome page with minor adjustment.
   * In the main section, there is now a 4 photos that are used as selectors for the individual album which slides out when the user select the respective album.
   * Since the photos are minimized in the page, I have setup a lightbox using the work of [Lightbox by Lokesh Dhakar](http://lokeshdhakar.com/projects/lightbox2/) so that used can see the photo in their maximized form when they click on the photo.
   * I have also put the photo into groups based on the event and used a jquery's hide and show function to filter photos belonging to the same group.  Note that in this version, the link tap is disabled when the page is smaller than 768px;
4. _Portfolio Page_
    * Just a few blank box for later use, design to be altered down the road.
5. _COntact Page_
    * Same as the Portfolio page, more functionality and design will be provided in the future.
  
I hope this website could showcase some of the things I learned from the material provided by the HTML/CSS/JS resource provided by Accelerate HK.
