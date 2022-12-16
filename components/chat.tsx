import { Client } from "@xmtp/xmtp-js";
import { useReducerContext } from "../api/context";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Chat = () => {
  const ethereum = typeof window !== "undefined" && window ? window.ethereum : {};

  const { state } = useReducerContext();
  const [client, setClient] = useState<Client | null>(null);
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [selectedConvo, setSelectedConvo] = useState("");
  const [selectedConvoMessages, setSelectedConvoMessages] = useState(new Array());
  const [conversations, setConversations] = useState(new Map());
  const [convoMessages, setConvoMessages] = useState(new Map());
  const [sortedConvos, setSortedConvos] = useState(new Map());
  const [newAddress, setNewAddress] = useState("");
  const [msgTxt, setMsgTxt] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const connectXmtp = async () => {
    const web3Provider = new ethers.providers.Web3Provider(ethereum, "any");
    const newSigner = web3Provider.getSigner(state.walletAddress);
    const xmtp = await Client.create(newSigner);
    setClient(xmtp);
  };

  const getConversations = async () => {
    if (client) {
      const allConversations = await client.conversations.list();
      //   console.log(allConversations);
      Promise.all(
        allConversations.map(async (convo) => {
          if (convo.peerAddress !== state.walletAddress) {
            const messages = await convo.messages();
            setConvoMessages(convoMessages.set(convo.peerAddress, messages));
            setConversations(conversations.set(convo.peerAddress, convo));
            setSortedConvos(sortConvos(convoMessages.set(convo.peerAddress, messages)));
            console.log(convoMessages);
            console.log(conversations);
          }
        })
      );
    }
  };

  const sortConvos = (convoMessages: any) =>
    new Map(
      [...convoMessages.entries()].sort((convoA, convoB) => {
        return getLatestMessage(convoA[1])?.sent < getLatestMessage(convoB[1])?.sent ? 1 : -1;
      })
    );

  const reset = () => {
    setSelectedConvo("");
    setIsNewMsg(false);
    setMsgTxt("");
    setNewAddress("");
    setErrorMsg("");
  };

  const sendNewMessage = async (message: any) => {
    if (!client || !selectedConvo) {
      return;
    }
    const conversation = await client.conversations.newConversation(selectedConvo);
    if (!conversation) return;
    await conversation.send(message);
  };

  const checkIfOnNetwork = async (address: any) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = async (newAddress: any) => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid address");
    } else {
      const isOnNetwork = await checkIfOnNetwork(newAddress);
      if (!isOnNetwork) {
        setErrorMsg("Address not on XMTP network");
      } else {
        setSelectedConvo(newAddress);
        setErrorMsg("");
      }
    }
  };

  const getLatestMessage = (messages: any) =>
    messages?.length ? messages[messages.length - 1] : null;

  const shortAddress = (addr: string) =>
    addr.length > 10 && addr.startsWith("0x")
      ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
      : addr;

  const truncate = (str: string, length: number) => {
    if (!str) {
      return str;
    }
    if (str.length > length) {
      return `${str.substring(0, length - 3)}...`;
    }
    return str;
  };

  const useStreamConversations = () => {
    const [stream, setStream] = useState<any>("");

    useEffect(() => {
      if (!conversations || !client) return;

      const streamConversations = async () => {
        const newStream = await client.conversations.stream();
        setStream(stream);
        for await (const convo of newStream) {
          if (convo.peerAddress !== state.walletAddress) {
            const messages = await convo.messages();
            setConvoMessages(convoMessages.set(convo.peerAddress, messages));
            setConversations(conversations.set(convo.peerAddress, convo));
          }
        }
      };

      streamConversations();

      return () => {
        const closeStream = async () => {
          if (!stream) return;
          await stream.return();
        };
        closeStream();
      };
      // eslint-disable-next-line
    }, [conversations]);
  };
  useStreamConversations();

  const useStreamMessages = (peerAddress: any) => {
    const [stream, setStream] = useState<any>("");
    const [conversation, setConversation] = useState<any>(null);

    useEffect(() => {
      const getConvo = async () => {
        if (!client || !peerAddress) {
          return;
        }
        setConversation(await client.conversations.newConversation(peerAddress));
      };
      getConvo();
    }, [client, peerAddress]);

    useEffect(() => {
      if (!conversation) return;

      const streamMessages = async () => {
        const newStream = await conversation.streamMessages();
        setStream(newStream);
        for await (const msg of newStream) {
          const newMessages = convoMessages.get(conversation.peerAddress) ?? [];
          newMessages.push(msg);
          const uniqueMessages = [
            ...Array.from(new Map(newMessages.map((item: any) => [item["id"], item])).values()),
          ];
          setConvoMessages(convoMessages.set(conversation.peerAddress, uniqueMessages));
          setSelectedConvoMessages(
            convoMessages.set(conversation.peerAddress, uniqueMessages).get(selectedConvo)
          );
        }
      };
      streamMessages();

      return () => {
        const closeStream = async () => {
          if (!stream) return;
          await stream.return();
        };
        closeStream();
      };
      // eslint-disable-next-line
    }, [convoMessages, state.walletAddress, conversation]);
  };
  useStreamMessages(selectedConvo);

  useEffect(() => {
    // Get Conversations after connected to XMTP
    if (client) {
      getConversations();
    }
  }, [client]);

  useEffect(() => {
    // Get Conversations after connected to XMTP
    if (client) {
      setSelectedConvoMessages(convoMessages.get(selectedConvo));
    }
  }, [selectedConvo]);

  return (
    <div className="flex flex-col p-2 h-80 mx-32 shadow items-start text-blue-50 border border-blue-50 rounded">
      <div className="flex items-start justify-between w-full">
        <p className="font-bold mr-auto">OSFD Chat</p>
        {!client ? (
          <div>
            {state.walletAddress ? (
              <button
                className="border border-blue-50 font-bold py-2 px-4 rounded"
                onClick={() => connectXmtp()}
              >
                Connect to XMTP
              </button>
            ) : (
              <p>Connect wallet first</p>
            )}
          </div>
        ) : (
          <div>{shortAddress(state.walletAddress)}</div>
        )}
      </div>

      {client && (
        <>
          {!selectedConvo && !isNewMsg ? (
            <div className="flex flex-col w-full">
              <div className="flex justify-between align-center">
                <div>
                  <h4>Conversations</h4>
                </div>
                <div>
                  <button
                    className="btn border border-blue-50 rounded px-4"
                    onClick={() => setIsNewMsg(true)}
                  >
                    + New message
                  </button>
                </div>
              </div>

              <div className="flex flex-col divide-y overflow-scroll">
                {/* Conversation list*/}
                {Array.from(sortedConvos.keys()).map((address) => {
                  if (sortedConvos.get(address).length > 0) {
                    return (
                      <div
                        key={"Convo_" + address}
                        onClick={() => setSelectedConvo(address)}
                        className="flex justify-start border rounded p-2 my-1 cursor-pointer"
                      >
                        <div className="flex align-start flex-col justify-start">
                          <div>
                            <b>{shortAddress(address)}</b>
                          </div>
                          <div>
                            {getLatestMessage(sortConvos(sortedConvos).get(address)).content &&
                              truncate(
                                getLatestMessage(sortConvos(sortedConvos).get(address)).content,
                                75
                              )}
                          </div>
                        </div>
                      </div>
                    );
                  } else return null;
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="flex w-full h-auto flex-col align-center justify-start overflow-scroll">
                <div className="flex">
                  <button
                    onClick={reset}
                    className="border rounded border-blue-50 px-2 mr-2 justify-center"
                  >
                    Back
                  </button>
                  {isNewMsg ? (
                    <>
                      <input
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        placeholder="Enter a wallet address"
                        type="text"
                        className="text-input border border-blue-50 rounded"
                        onBlur={() => onInputBlur(newAddress)}
                      />
                      {errorMsg && <span className="ml-2">{errorMsg}</span>}
                    </>
                  ) : (
                    <b>Chatting with: {shortAddress(selectedConvo)}</b>
                  )}
                </div>{" "}
                {/* Message List */}
                <div className="flex flex-col">
                  <div className="overflow-scroll">
                    {!isNewMsg &&
                      selectedConvoMessages &&
                      selectedConvoMessages.map((msg: any) => {
                        return (
                          <div className="flex justify-start p-1">
                            <div className="flex align-start flex-col justify-start">
                              <div>
                                <b>{shortAddress(msg.senderAddress)}</b>
                              </div>
                              <div>{msg.content}</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex items-center mt-2 content-center">
                    <input
                      value={msgTxt}
                      onChange={(e) => setMsgTxt(e.target.value)}
                      type="text"
                      className="border mr-4 rounded"
                      placeholder="Write a message"
                    />
                    <button
                      className="border rounded px-2"
                      onClick={() => {
                        sendNewMessage(msgTxt);
                        setMsgTxt("");
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
