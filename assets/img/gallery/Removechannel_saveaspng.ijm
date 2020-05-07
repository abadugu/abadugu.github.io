run("Arrange Channels...", "new=1");
run("Scale Bar...", "width=10 height=5 font=18 color=White background=None location=[Lower Right] bold overlay");
name = getTitle(); 
temporalgraphsdir = "C:\Users\wind911\Documents\GitHub\abadugu.github.io\assets\img\gallery";
saveAs("png", temporalgraphsdir+File.separator+name);