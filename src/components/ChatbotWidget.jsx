// src/components/ChatWidget.jsx
import React, { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function ChatWidget() {
    useEffect(() => {
        createChat({
            webhookUrl: "https://n8n.srv929626.hstgr.cloud/webhook/314ce18e-efe9-487c-ab35-4fc2cd673762/chat",
            target: "#n8n-chat",
            mode: "window", // or "fullscreen"
            // chatInputKey: "chatInput",
            // chatSessionKey: "sessionId",
            // metadata: { /* optional metadata */ },
            // showWelcomeScreen: false,
            // defaultLanguage: "en",
            // initialMessages: [
            //     "Hi there! 👋",
            //     "How can I help you today?"
            // ],
            // i18n: {
            //     en: {
            //         title: "Support",
            //         subtitle: "Ask me anything",
            //         inputPlaceholder: "Type your message…",
            //         getStarted: "Start Chat",
            //         footer: "",
            //     },
            // },
        });
    }, []);


    return <div id="n8n-chat" className="fixed bottom-4 right-4 z-999"></div>;


}