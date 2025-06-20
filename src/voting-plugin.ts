import { ethereum, Bytes } from "@graphprotocol/graph-ts";
import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  Initialized as InitializedEvent,
  MembersAdded as MembersAddedEvent,
  MembersRemoved as MembersRemovedEvent,
  MembershipContractAnnounced as MembershipContractAnnouncedEvent,
  MetadataSet as MetadataSetEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  TargetSet as TargetSetEvent,
  Upgraded as UpgradedEvent,
  VoteCast as VoteCastEvent,
  VotingMinApprovalUpdated as VotingMinApprovalUpdatedEvent,
  VotingSettingsUpdated as VotingSettingsUpdatedEvent
} from "../generated/VotingPlugin/voting_plugin";
import {
  AdminChanged,
  BeaconUpgraded,
  Initialized,
  MembersAdded,
  MembersRemoved,
  MembershipContractAnnounced,
  MetadataSet,
  ProposalCreated,
  ProposalExecuted,
  TargetSet,
  Upgraded,
  VoteCast,
  VotingMinApprovalUpdated,
  VotingSettingsUpdated
} from "../generated/schema";

function getId(event: ethereum.Event): string {
  return event.transaction.hash.toHex() + "-" + event.logIndex.toString();
}

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(getId(event));
  entity.previousAdmin = event.params.previousAdmin;
  entity.newAdmin = event.params.newAdmin;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(getId(event));
  entity.beacon = event.params.beacon;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(getId(event));
  entity.version = event.params.version;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleMembersAdded(event: MembersAddedEvent): void {
  let entity = new MembersAdded(getId(event));
  // Convert Address[] to Bytes[]
  let membersBytes: Bytes[] = [];
  for (let i = 0; i < event.params.members.length; i++) {
    let addr = event.params.members[i];
    membersBytes.push(Bytes.fromHexString(addr.toHexString()));
  }
  entity.members = membersBytes;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleMembersRemoved(event: MembersRemovedEvent): void {
  let entity = new MembersRemoved(getId(event));
  // Convert Address[] to Bytes[]
  let membersBytes: Bytes[] = [];
  for (let i = 0; i < event.params.members.length; i++) {
    let addr = event.params.members[i];
    membersBytes.push(Bytes.fromHexString(addr.toHexString()));
  }
  entity.members = membersBytes;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleMembershipContractAnnounced(event: MembershipContractAnnouncedEvent): void {
  let entity = new MembershipContractAnnounced(getId(event));
  entity.definingContract = event.params.definingContract;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleMetadataSet(event: MetadataSetEvent): void {
  let entity = new MetadataSet(getId(event));
  entity.metadata = event.params.metadata;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  // Use on-chain proposalId as the entity ID
  let proposalId = event.params.proposalId.toString();
  let entity = new ProposalCreated(proposalId);
  entity.creator = event.params.creator;
  entity.startDate = event.params.startDate;
  entity.endDate = event.params.endDate;
  entity.metadata = event.params.metadata;
  // Placeholder for complex structs
  entity.actions = Bytes.fromHexString("0x");
  entity.allowFailureMap = event.params.allowFailureMap;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  // Use the same proposalId as the entity ID
  let proposalId = event.params.proposalId.toString();
  let entity = new ProposalExecuted(proposalId);
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleTargetSet(event: TargetSetEvent): void {
  let entity = new TargetSet(getId(event));
  // Placeholder for complex struct
  entity.newTargetConfig = Bytes.fromHexString("0x");
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(getId(event));
  entity.implementation = event.params.implementation;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(getId(event));
  entity.proposalId = event.params.proposalId;
  entity.voter = event.params.voter;
  entity.voteOption = event.params.voteOption;
  entity.votingPower = event.params.votingPower;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleVotingMinApprovalUpdated(event: VotingMinApprovalUpdatedEvent): void {
  let entity = new VotingMinApprovalUpdated(getId(event));
  entity.minApprovals = event.params.minApprovals;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}

export function handleVotingSettingsUpdated(event: VotingSettingsUpdatedEvent): void {
  let entity = new VotingSettingsUpdated(getId(event));
  entity.votingMode = event.params.votingMode;
  entity.supportThreshold = event.params.supportThreshold.toI32();
  entity.minParticipation = event.params.minParticipation.toI32();
  entity.minDuration = event.params.minDuration;
  entity.minProposerVotingPower = event.params.minProposerVotingPower;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.save();
}
