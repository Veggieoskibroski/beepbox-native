const { app, BrowserWindow } = require('electron')
const path = require('path')
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

function threrr() {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 150
    })
        
    mainWindow.loadFile('errorHand.html')
    mainWindow.setMenu(null)
} 

const createWindow = () => {
    
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + "/icon.png"
    })
        
    mainWindow.loadFile('beepbox_offline.html')
    mainWindow.setMenu(null)
        
}

app.whenReady().then(() => {
        const request = http.get("https://www.beepbox.co/beepbox_offline.html", function(response) {
            const file = fs.createWriteStream(__dirname + "/beepbox_offline.html");
        response.pipe(file);

       // after download completed close filestream
       file.on("finish", () => {
                file.close();
                console.log("Beepbox Download Complete");
                createWindow()
            });
        }).on("error", (err) => {
            console.log("Offline!")

            fs.access(__dirname + '/beepbox_offline.html',(err) => {
                console.log(err)
                if (err) {
                    threrr()
                } else {
                    createWindow()
                }
        
        })

        });
  

  app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})