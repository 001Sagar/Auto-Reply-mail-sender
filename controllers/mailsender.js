const route = require('../routes/route');
const { google } = require('googleapis');
const readline = require('readline');


module.exports.sendMail = async function(req,res){
    try {
      const LABEL_NAME = 'Vacation Replies';
      const INTERVAL_MIN = 45000;
      const INTERVAL_MAX = 120000;
      
      const credentials = require('../credentials.json');
      
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials(credentials);
      
      const gmail = google.gmail({
        version: 'v1',
        auth: oauth2Client,
      });
      
      setInterval(checkAndReplyEmails, getRandomInterval());
      
      async function checkAndReplyEmails() {
        const threads = await listUnreadEmailThreads();
      
        for (const thread of threads) {
          const messageId = thread.messages[0].id;
      
          const hasReplied = await hasRepliedToThread(thread.id);
          if (!hasReplied) {
            await sendReply(messageId);
            await addLabelToThread(thread.id);
          }
        }
      }
      
      async function listUnreadEmailThreads() {
        const res = await gmail.users.threads.list({ userId: 'me', q: 'is:unread' });
        return res.data.threads || [];
      }
      
      async function hasRepliedToThread(threadId) {
        const res = await gmail.users.threads.get({ userId: 'me', id: threadId });
        return res.data.messages[0].labelIds.includes('SENT');
      }
      
      async function sendReply(messageId) {
        const res = await gmail.users.messages.send({
          userId: 'me',
          requestBody: {
            raw: `From: <me>\nTo: <me>\nSubject: Re: Your Subject\n\nYour reply message goes here.`,
            threadId: messageId,
          },
        });
        console.log(`Replied to email thread ${messageId}.`);
      }
      
      async function addLabelToThread(threadId) {
        const res = await gmail.users.threads.modify({
          userId: 'me',
          id: threadId,
          requestBody: { addLabelIds: [await getOrCreateLabel()] },
        });
        console.log(`Added label to email thread ${threadId}.`);
      }
      
      async function getOrCreateLabel() {
        const res = await gmail.users.labels.list({ userId: 'me' });
        const labels = res.data.labels || [];
        const existingLabel = labels.find((label) => label.name === LABEL_NAME);
      
        if (existingLabel) {
          return existingLabel.id;
        } else {
          const res = await gmail.users.labels.create({
            userId: 'me',
            requestBody: {
              name: LABEL_NAME,
              labelListVisibility: 'labelShow',
              messageListVisibility: 'show',
            },
          });
          console.log(`Created label ${LABEL_NAME}.`);
          return res.data.id;
        }
      }
      
      function getRandomInterval() {
        return Math.floor(Math.random() * (INTERVAL_MAX - INTERVAL_MIN + 1) + INTERVAL_MIN);
      }
      


    } catch (error) {
        if(error){
            console.log(error);
        }
        return error;
    }
}