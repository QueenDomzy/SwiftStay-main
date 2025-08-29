// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
      private client: OpenAI;
        private model: string;

          constructor(private readonly config: ConfigService) {
                  const apiKey = this.config.get<string>('AI_API_KEY');
                      const baseURL = this.config.get<string>('AI_API_BASE') || undefined;
                          this.model = this.config.get<string>('AI_MODEL') || 'gpt-4o-mini';

                              this.client = new OpenAI({
                                        apiKey,
                                              baseURL, // works with OpenAI or any compatible gateway
                              });
          }

            async chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
                    // Make sure we always have a helpful system prompt
                        const systemPrompt = {
                                  role: 'system' as const,
                                        content:
                                                'You are SwiftStay’s concierge assistant. Be concise, friendly, and helpful about reservations, locations in Nigeria, pricing, and payment status.',
                        };

                            const trimmed = messages?.length ? messages.slice(-12) : [];
                                const response = await this.client.chat.completions.create({
                                          model: this.model,
                                                messages: [systemPrompt, ...trimmed],
                                                      temperature: 0.3,
                                });

                                    const text =
                                          response.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.';
                                              return { reply: text };
            }
}
                                })
                        }
            }
                              })
          }
}