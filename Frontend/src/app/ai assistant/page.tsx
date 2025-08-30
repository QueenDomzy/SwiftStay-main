import ChatBox from "../../components/ChatBox";

export default function AIAssistantPage() {
  return (
    <section className="p-10">
      <h1 className="text-2xl font-bold mb-4">SwiftStay AI Assistant 🤖</h1>
      <p className="mb-6 text-gray-600">Ask about bookings, hotels, or travel tips.</p>
      <ChatBox />
    </section>
  );
}
