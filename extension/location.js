//Get website's names
chrome.tabs.getSelected(null,function(tab) {

	if(tab.url.includes('facebook'))
	{
    	document.getElementById("website").innerHTML ="Facebook ";
    	document.getElementById("website").style.color = 'navy';
	}
    else
        document.getElementById("website").innerHTML ="Other ";
});