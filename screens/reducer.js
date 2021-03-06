export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';

export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_FAIL = 'GET_FRIENDS_FAIL';

export const GET_PENDING_FRIENDS = 'GET_PENDING_FRIENDS_FAIL';
export const GET_PENDING_FRIENDS_SUCCESS = 'GET_PENDING_FRIENDS_FAIL_SUCCESS';
export const GET_PENDING_FRIENDS_FAIL = 'GET_PENDING_FRIENDS_FAIL_FAIL';

export const GET_PREVIOUS_MESSAGES = 'GET_PREVIOUS_MESSAGES';
export const GET_PREVIOUS_MESSAGES_SUCCESS = 'GET_PREVIOUS_MESSAGES_SUCCESS';
export const GET_PREVIOUS_MESSAGES_FAIL = 'GET_PREVIOUS_MESSAGES_FAIL';

export const GET_SEARCH_GLOBAL_USERS = 'GET_SEARCH_GLOBAL_USERS';
export const GET_SEARCH_GLOBAL_USERS_SUCCESS = 'GET_SEARCH_GLOBAL_USERS_SUCCESS';
export const GET_SEARCH_GLOBAL_USERS_FAIL = 'GET_SEARCH_GLOBAL_USERS_FAIL';

export const POST_REQUEST_FRIEND = 'POST_REQUEST_FRIEND';
export const POST_REQUEST_FRIEND_SUCCESS = 'POST_REQUEST_FRIEND_SUCCESS';
export const POST_REQUEST_FRIEND_FAIL = 'POST_REQUEST_FRIEND_FAIL';

export const POST_CONFIRM_FRIEND = 'POST_CONFIRM_FRIEND';
export const POST_CONFIRM_FRIEND_SUCCESS = 'POST_CONFIRM_FRIEND_SUCCESS';
export const POST_CONFIRM_FRIEND_FAIL = 'POST_CONFIRM_FRIEND_FAIL';

export const POST_REMOVE_FRIEND = 'POST_REMOVE_FRIEND';
export const POST_REMOVE_FRIEND_SUCCESS = 'POST_REMOVE_FRIEND_SUCCESS';
export const POST_REMOVE_FRIEND_FAIL = 'POST_REMOVE_FRIEND_FAIL';

export const POST_SET_PROFILE_PICTURE = 'POST_SET_PROFILE_PICTURE';
export const POST_SET_PROFILE_PICTURE_SUCCESS = 'POST_SET_PROFILE_PICTURE_SUCCESS';
export const POST_SET_PROFILE_PICTURE_FAIL = 'POST_SET_PROFILE_PICTURE_FAIL';

export const POST_SET_PROFILE_BIO = 'POST_SET_PROFILE_BIO';
export const POST_SET_PROFILE_BIO_SUCCESS = 'POST_SET_PROFILE_BIO_SUCCESS';
export const POST_SET_PROFILE_BIO_FAIL = 'POST_SET_PROFILE_BIO_FAIL';

export const POST_REMOVE_PENDING_FRIEND = 'POST_REMOVE_PENDING_FRIEND';
export const POST_REMOVE_PENDING_FRIEND_SUCCESS = 'POST_REMOVE_PENDING_FRIEND_SUCCESS';
export const POST_REMOVE_PENDING_FRIEND_FAIL = 'POST_REMOVE_PENDING_FRIEND_FAIL';

export const SET_FRIEND_PROFILE_PICTURE_LOCAL_PATH = 'SET_FRIEND_PROFILE_PICTURE_LOCAL_PATH';
export const SET_PENDING_FRIEND_PROFILE_PICTURE_LOCAL_PATH = 'SET_PENDING_FRIEND_PROFILE_PICTURE_LOCAL_PATH';
export const SET_PROFILE_PICTURE_LOCAL_PATH = 'SET_PROFILE_PICTURE_LOCAL_PATH';

export const SET_FRIEND_MESSAGES = 'SET_FRIEND_MESSAGES';
export const SET_FRIEND_MESSAGES_SUCCESS = 'SET_FRIEND_MESSAGES_SUCCESS';
export const SET_FRIEND_MESSAGES_FAIL = 'SET_FRIEND_MESSAGES_FAIL';

export const POST = 'POST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAIL = 'POST_FAIL';

const initialState = {
    baseURL: 'https://rena-chat.herokuapp.com',
    messages: [],
    friends: [],
    profile: {
        bio: null,
    },
    pending_friends: [],
    userSearchIsLoading: false,
    searchedUsers: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_FRIENDS:
            return {
                ...state,
                loading: true
            }
        case GET_FRIENDS_SUCCESS:
            return {
                ...state,
                loading: false,
                friends: action.payload.data
            }
        case GET_FRIENDS_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            };
        case GET_PENDING_FRIENDS:
            return {
                ...state,
                loading: true
            }
        case GET_PENDING_FRIENDS_SUCCESS:
            return {
                ...state,
                loading: false,
                pending_friends: action.payload.data
            }
        case GET_PENDING_FRIENDS_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            };
        case SET_FRIEND_PROFILE_PICTURE_LOCAL_PATH: {
            let { index, profile_picture_local_path } = action.payload;
            // Extract target friend by friends array index and create the property profile_picture_local_path
            // Setting it to the profile_picture_local_path in the paylod.
            let targetFriend = state.friends[index];
            targetFriend.profile_picture_local_path = profile_picture_local_path;
            return {
                ...state,
                friends: [
                    ...state.friends.slice(0, index),
                    targetFriend,
                    ...state.friends.slice(index + 1)
                ]
            };
        }
        case SET_PENDING_FRIEND_PROFILE_PICTURE_LOCAL_PATH: {
            let { index, profile_picture_local_path } = action.payload;
            // Extract target friend by friends array index and create the property profile_picture_local_path
            // Setting it to the profile_picture_local_path in the paylod.
            let targetFriend = state.pending_friends[index];
            targetFriend.profile_picture_local_path = profile_picture_local_path;
            return {
                ...state,
                pending_friends: [
                    ...state.pending_friends.slice(0, index),
                    targetFriend,
                    ...state.pending_friends.slice(index + 1)
                ]
            };
        }
        case GET_PROFILE:
            return {
                ...state,
                loading: true,
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload,
                profile: {
                    ...action.payload.data,
                }
            };
        case GET_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            };
        case GET_PREVIOUS_MESSAGES:
            return {
                ...state,
                loading: true,
            };
        case GET_PREVIOUS_MESSAGES_SUCCESS:
            let lastMessages = [];

            // Messages object contains a results property that stores individual messages in an array
            action.payload.data.results.forEach((message) => {
                var message_contents_object = JSON.parse(message.message_contents);
                message_contents_object._id = message.id;
                message.message_contents = JSON.stringify(message_contents_object);

                lastMessages = [...lastMessages, message_contents_object];
            })
            return {
                ...state,
                loading: false,
                response: action.payload,
                messages: lastMessages
            };
        case GET_PREVIOUS_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            };
        case GET_SEARCH_GLOBAL_USERS:
            return {
                ...state,
                userSearchIsLoading: true,
            };
        case GET_SEARCH_GLOBAL_USERS_SUCCESS:
            // Friends object contains a pk property that needs to be converted to 'id'
            action.payload.data.forEach((user) => {
                user.id = user.pk;
                user.name = user.username;
            });
            return {
                ...state,
                response: action.payload,
                searchedUsers: action.payload.data,
                userSearchIsLoading: false,
            }
        case GET_SEARCH_GLOBAL_USERS_FAIL:
            return {
                ...state,
                userSearchIsLoading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            };
        case POST:
            return {
                ...state,
                loading: true
            };
        case POST_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload,
                jwt_token: action.payload.data.token
            };
        case POST_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            };


        case POST_REQUEST_FRIEND:
            return {
                ...state,
                loading: true
            }
        case POST_REQUEST_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload.data,
            };
        case POST_REQUEST_FRIEND_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            }
        case POST_CONFIRM_FRIEND:
            return {
                ...state,
                loading: true
            }
        case POST_CONFIRM_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload.data,
            };
        case POST_CONFIRM_FRIEND_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            }
        case POST_REMOVE_FRIEND:
            return {
                ...state,
                loading: true
            }
        case POST_REMOVE_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload.data,
            };
        case POST_REMOVE_FRIEND_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            }
        case POST_SET_PROFILE_PICTURE:
            return {
                ...state,
                loading: true,
            }
        case POST_SET_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload.data,
            };
        case POST_SET_PROFILE_PICTURE_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            }
        case POST_SET_PROFILE_BIO:
            return {
                ...state,
                loading: true,
            }
        case POST_SET_PROFILE_BIO_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: {
                    ...state.profile,
                    // Add bio payload from initial request.
                    bio: action.meta.previousAction.payload.bio
                },
                response: action.payload,
            };
        case POST_SET_PROFILE_BIO_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            }
        case POST_REMOVE_PENDING_FRIEND:
            return {
                ...state,
                loading: true,
            }
        case POST_REMOVE_PENDING_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload.data,
            };
        case POST_REMOVE_PENDING_FRIEND_FAIL:
            return {
                ...state,
                loading: false,
                response: {
                    ...action.error,
                    // Middleware embeds status code on failure inside of the message property string.
                    status: action.error.response.status
                }
            }
        case SET_PROFILE_PICTURE_LOCAL_PATH:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    profile_picture_local_path: action.payload.profile_picture_local_path
                }
            }
        default:
            return state;
    }
}

export function postHttp(url, data) {
    return {
        type: POST,
        payload: {
            request: {
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' },
                method: 'post',
                url: url,
            }

        }
    };
}

export function postRequestFriend(url, headers, data) {
    return {
        type: POST_REQUEST_FRIEND,
        payload: {
            request: {
                data: data,
                headers: headers,
                method: 'post',
                url: url,
            }

        }
    };
}

export function postConfirmFriend(url, headers, data) {
    return {
        type: POST_CONFIRM_FRIEND,
        payload: {
            request: {
                data: data,
                headers: headers,
                method: 'post',
                url: url,
            }

        }
    };
}

export function postRemoveFriend(url, headers, data) {
    return {
        type: POST_REMOVE_FRIEND,
        payload: {
            request: {
                data: data,
                headers: headers,
                method: 'post',
                url: url,
            }

        }
    };
}

export function postSetProfilePicture(url, headers, data) {
    return {
        type: POST_SET_PROFILE_PICTURE,
        payload: {
            request: {
                data: data,
                headers: headers,
                method: 'post',
                url: url,
            }

        }
    };
}

export function postSetProfileBio(url, headers, data, bio) {
    return {
        type: POST_SET_PROFILE_BIO,
        payload: {
            request: {
                data: data,
                headers: headers,
                method: 'post',
                url: url,
            },
            bio: bio

        }
    };
}

export function postRemovePendingFriend(url, headers, data) {
    return {
        type: POST_REMOVE_PENDING_FRIEND,
        payload: {
            request: {
                data: data,
                headers: headers,
                method: 'post',
                url: url,
            }

        }
    };
}


export function getHttp(url, headers) {
    return {
        type: GET_PROFILE,
        payload: {
            request: {
                headers: headers,
                method: 'get',
                url: url,
            }

        }
    };
}

export function getSearchGlobalUsers(url, headers) {
    return {
        type: GET_SEARCH_GLOBAL_USERS,
        payload: {
            request: {
                headers: headers,
                method: 'get',
                url: url,
            }

        }
    };
}

export function getFriends(url, headers) {
    return {
        type: GET_FRIENDS,
        payload: {
            request: {
                headers: headers,
                method: 'get',
                url: url,
            }

        }
    };
}

export function getPendingFriends(url, headers) {
    return {
        type: GET_PENDING_FRIENDS,
        payload: {
            request: {
                headers: headers,
                method: 'get',
                url: url,
            }

        }
    }
}

export function getPreviousMessages(url, headers) {
    return {
        type: GET_PREVIOUS_MESSAGES,
        payload: {
            request: {
                headers: headers,
                method: 'get',
                url: url,
            },
        }
    }
}

export function setFriendPictureLocalPath(path, index) {
    return {
        type: SET_FRIEND_PROFILE_PICTURE_LOCAL_PATH,
        payload: {
            index,
            profile_picture_local_path: path
        }
    };
}

export function setPendingFriendPictureLocalPath(path, index) {
    return {
        type: SET_PENDING_FRIEND_PROFILE_PICTURE_LOCAL_PATH,
        payload: {
            index,
            profile_picture_local_path: path
        }
    }
}

export function setProfilePictureLocalPath(path) {
    return {
        type: SET_PROFILE_PICTURE_LOCAL_PATH,
        payload: {
            profile_picture_local_path: path
        }
    };
}

export function setFriendMessages(friend_id, messages) {
    return {
        type: SET_FRIEND_MESSAGES,
        payload: {
            friend_id,
            messages
        }
    }
}

