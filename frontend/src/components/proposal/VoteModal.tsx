import { FC } from "react";
import { Proposal } from "../../types";
import { ConnectButton, useCurrentWallet } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../../config/networkConfig";

interface VoteModalProps {
  proposal: Proposal;
  isOpen: boolean;
  onClose: () => void;
  onVote: (votedYes: boolean) => void;
};

export const VoteModal: FC<VoteModalProps> = ({
  proposal,
  isOpen,
  onClose,
  onVote,
}) => {
  const { connectionStatus } = useCurrentWallet();
  const packageId = useNetworkVariable("packageId");

  if (!isOpen) return null;

  const vote = (voteYes: boolean) => {
    console.log("package id: " + packageId);
    console.log("proposal id: " + proposal.id.id);
    console.log("Voted yes: " + voteYes);
    onVote(voteYes);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{proposal.title}</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">{proposal.description}</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>👍Yes votes: {proposal.votedYesCount}</span>
            <span>👎No votes: {proposal.votedNoCount}</span>
          </div>
          <div className="flex justify-between gap-4">
            { connectionStatus === "connected" ?
              <>
                <button
                  onClick={() => vote(true)}
                  className="flex-1 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Vote Yes
                </button>
                <button
                  onClick={() => vote(false)}
                  className="flex-1 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Vote No
                </button>
              </> :
              <div>
                <ConnectButton connectText="Connect to vote" />
              </div>
            }
          </div>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
