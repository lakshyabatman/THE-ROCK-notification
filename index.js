const fs = require('fs');
const cron = require('node-cron');
const NotificationCenter = require('node-notifier').NotificationCenter;
const path = require('path')
var notifier = new NotificationCenter({
  withFallback: false, 
  customPath: undefined 
});
 
let QUOTES =[]


try {  
    QUOTES = fs.readFileSync('./scraper/quotes.txt', 'utf8');
    QUOTES = QUOTES.split("\n");    
} catch(e) {
    console.log('Error:', e.stack);
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const OPTS = {
  wait: true,
  sound:'Hero',
  icon:path.join(__dirname,'./assets/logo.jpg')
}


let random_quote_index = getRandomInt(QUOTES.length)
let random_quote_array = QUOTES[random_quote_index].split("-source-")
notifier.notify({
  ...OPTS,
  title: 'This is how you\'ll recieve notification!',
  message: random_quote_array[0],
  open:random_quote_array[1],
  });



cron.schedule('*/1 * * * *', () => {
  let random_quote_index = getRandomInt(QUOTES.length)
  let random_quote_array = QUOTES[random_quote_index].split("-source-")
  notifier.notify({
    ...OPTS,
    title: 'The Rock says',
    message: random_quote_array[0],
    open:random_quote_array[1],
    });
   


});