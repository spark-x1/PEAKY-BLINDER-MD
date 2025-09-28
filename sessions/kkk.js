const { default: makeWASocket, useMultiFileAuthState, WA_MESSAGE_TYPES } = require('@adiwajshing/baileys');

const followChannel = async (sock, channelJid) => {
    try {
        // Follow the channel using the provided channelJid
        await sock.sendMessage(channelJid, { text: 'Following the channel...' });
        console.log(`Successfully followed channel: ${channelJid}`);
    } catch (error) {
        console.error(`Failed to follow channel: ${error.message}`);
    }
};

// Example usage:
const startBot = async () => {
    const { state, saveState } = await useMultiFileAuthState('./auth_info');  // Auth state saved to './auth_info'
    const sock = makeWASocket({
        auth: state
    });

    // Connect to WhatsApp
    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('Successfully connected to WhatsApp!');
        }
    });

    // Make sure to listen to messages
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const message = messages[0];
        if (message.message) {
            const jid = message.key.remoteJid;
            const messageContent = message.message.conversation;
            if (messageContent && messageContent.startsWith('!followchannel')) {
                const channelJid = '120363398430045533@newsletter'; // Example JID, can be dynamic
                await followChannel(sock, channelJid);
            }
        }
    });

    // Keep the connection alive
    sock.ev.on('creds.update', saveState);
};

// Start the bot
startBot();
