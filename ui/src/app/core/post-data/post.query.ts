import gql from 'graphql-tag';

export const profileQuery: any = gql`
query Feeds($feedtype: FeedType, $userid: String,  $offset: Int, $limit: Int) {
  feeds(feedType: $feedtype, userId: $userid, offset: $offset, limit: $limit) {
    _id
    text
    mentions
    geotag {
      type
      coordinates {
        lat
        long
      }
      title
      placeId
    }
    photos {
      xlarge
      large
      normal
      small
    }
    withFriends
    postType
    access
    userId
    userFirstName
    userLastName
    userImgNormal
    userImgSmall
    shares
    likes {
      userId
      like
    }
    bookmarks {
      userId
      bookMark
    }
    fileUrl {
      id
      ext
      thumbnail {
        ext
        xlarge
        large
        normal
        small
      }
    }
    create_date
    modified_date
  }
}
`;

export const feedQuery: any = gql`
  query Feeds($feedtype: FeedType, $userid: String,  $offset: Int, $limit: Int) {
  feeds(feedType: $feedtype, userId: $userid, offset: $offset, limit: $limit) {
    _id
    text
    mentions
    geotag {
      type
      coordinates {
        lat
        long
      }
      title
      placeId
    }
    photos {
      xlarge
      large
      normal
      small
    }
    withFriends
    postType
    access
    userId
    userFirstName
    userLastName
    userImgNormal
    userImgSmall
    shares
    likes {
      userId
      like
    }
    bookmarks {
      userId
      bookMark
    }
    fileUrl {
      id
      ext
      thumbnail {
        ext
        xlarge
        large
        normal
        small
      }
    }
    create_date
    modified_date
  }
}
`;

export const imagesQuery: any = gql`
  query Feeds($postTypes: [String], $userid: String, $offset: Int, $limit: Int) {
  feedsByPostTypes(postTypes: $postTypes, userId: $userid, offset: $offset, limit: $limit) {
    _id
    text
    geotag {
      type
      coordinates {
        lat
        long
      }
      title
      placeId
    }
    photos {
      xlarge
      large
      normal
      small
    }
    withFriends
    postType
    access
    userId
    userFirstName
    userLastName
    userImgNormal
    userImgSmall
    shares
    likes {
      userId
      like
    }
    bookmarks {
      userId
      bookMark
    }
    fileUrl {
      id
      ext
      thumbnail {
        ext
        xlarge
        large
        normal
        small
      }
    }
  }
}
`;

export const postByquery: any = gql`
  query Feeds( $postid: String) {
  postByPostId( postId: $postid) {
    _id
    text
    mentions
    geotag {
      type
      coordinates {
        lat
        long
      }
      title
      placeId
    }
    photos {
      xlarge
      large
      normal
      small
    }
    withFriends
    postType
    access
    userId
    userFirstName
    userLastName
    userImgNormal
    userImgSmall
    shares
    likes {
      userId
      like
    }
    bookmarks {
      userId
      bookMark
    }
    fileUrl {
      id
      ext
      thumbnail {
          ext
        xlarge
        large
        normal
        small
      }
    }
    create_date
    modified_date
  }
}
`;


