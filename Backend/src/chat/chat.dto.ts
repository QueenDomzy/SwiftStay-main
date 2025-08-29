// src/chat/chat.dto.ts
export class ChatMessageDto {
      role: 'user' | 'assistant' | 'system';
        content: string;
}

export class ChatRequestDto {
      messages: ChatMessageDto[]; // include past few turns for context
}
}
}