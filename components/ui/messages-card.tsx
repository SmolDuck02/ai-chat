import { Chat } from "@/lib/types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CardContent, CardDescription } from "./card";
import { Label } from "./label";

export default function MessagesCard({
  messages,
  currentUsername,
}: {
  messages: Chat[] | undefined;
  currentUsername: string;
}) {
  return (
    <CardContent
      id="messages-container"
      className="scroll-smooth scrollbar h-full p-5 flex flex-col gap-4"
    >
      {messages && messages[0]?.user.id ? (
        <CardDescription className=" w-full   gap-4  text-center flex flex-col ">
          {messages.map((message, index) => {
            const isAuthor =
              currentUsername == message.user.username &&
              message.user.username.toLowerCase() !== "guest";
            return (
              <div
                id={index.toString()}
                key={index}
                className={`flex gap-4 ${isAuthor && "self-end"} items-end`}
              >
                {!isAuthor && (
                  <Avatar className="mb-1">
                    <AvatarImage
                      src={
                        message.user.username.toLowerCase() === "tacodog"
                          ? "/avatars/tacodog.png"
                          : ""
                      }
                    />
                    <AvatarFallback>{message.user.username[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <Label
                    htmlFor={index.toString()}
                    className="pl-2 flex justify-start text-xs text-slate-500"
                  >
                    {message.user.username}
                  </Label>
                  {message && message.chat.toLowerCase().startsWith("https") ? (
                    <Image
                      src={message.chat}
                      alt="image generated response"
                      className="rounded"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <CardContent
                      id={index.toString()}
                      key={index}
                      className="border p-3 flex items-start  text-left w-auto rounded-lg"
                    >
                      {message.chat}
                    </CardContent>
                  )}
                </div>
              </div>
            );
          })}
        </CardDescription>
      ) : (
        <CardDescription className="h-full w-full text-center flex text-lg flex-col justify-center items-center">
          Chat with someone <br /> <span className="text-sm text-[#2e3e5a]">or</span> Chat with
          TacoDog by <br />
          <span className="text-sm text-[#2e3e5a]  mt-5">
            &quot;!&quot; prefix for text-based results! <br />
            &quot;/&quot; prefix for image-based results!
            <br />
            Warf!
          </span>
        </CardDescription>
      )}
    </CardContent>
  );
}
