
import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../subscription';
export const CHAT_MESSAGE_SUBSCRIPTION_TOPIC = 'CHAT_MESSAGE_ADDED';

export default   {
    Subscription: {
      chatMessageAdded: {
        subscribe: withFilter(() => pubsub.asyncIterator(CHAT_MESSAGE_SUBSCRIPTION_TOPIC), (payload, args) => {
          return payload.chatMessageAdded.channel.id === args.channelId;
        })
      }
    }
  };
  