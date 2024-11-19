export type AccountDetails = {
  id: number; // The unique account ID
  username: string; // The username of the account
  name: string; // Full name of the account holder
  include_adult: boolean; // Whether the account is set to include adult content
  email: string; // The account's email address
  iso_639_1: string; // The user's preferred language (ISO 639-1 code)
  avatar: {
    gravatar: {
      hash: string; // Gravatar hash for the profile picture
    };
    tmdb: {
      avatar_path: string | null; // Custom TMDB avatar path, null if not set
    };
  };
  session_id: string; // The current session ID, if applicable
};
