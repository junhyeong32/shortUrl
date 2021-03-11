const urlData = require("./copyUrlData");
const TelegramBot = require("node-telegram-bot-api");
const token = "1617257467:AAG-eQII7Loqxed93-CsaUBAPIN87ZxriAs";
const SocketIO = require("socket.io");
const io = SocketIO(3002);

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  io.on("connection", (socket) => {
    console.log("connection");
    socket.on("shortLink", (data) => {
      bot.sendMessage(chatId, data);
      //bot.sendMessage(chatId, urlData.getShortUrl());
    });
  });

  const chatId = msg.chat.id;
  urlData.set(msg.text);
  io.emit("newData", urlData.get());
});

bot.on("polling_error", (err) => console.log(err));
