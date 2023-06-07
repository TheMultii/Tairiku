import TairikuTokenData from "./TairikuTokenData";


export default interface TairikuTokenDataExtended extends TairikuTokenData {
  tairiku_profile: {
    bio: string;
    comments_number: number;
    created_at: string;
    posts_number: number;
    tairiku_images: number;
  };
  realm_access: {
    roles: string[];
  },
}