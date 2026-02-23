import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleConfig } from "../config/googleConfig";
import { Member } from "../modules/member/models/member.model";
import { hashPassword } from "../utils/hashPassword";

passport.use(
  new GoogleStrategy(
    {
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callBackURL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function,
    ) => {
      try {
        const { id, emails, name } = profile;
        const existingUser = await Member.findOne({ googleId: id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const password = "randomPassword123";
        const hasedPassword = await hashPassword(password);
        const newMember = new Member({
          googleId: id,
          email: emails[0].value,
          memberFirstName: name.givenName || "User",
          memberLastName: name.familyName || "Google",
          password: hasedPassword,
          YOB: new Date("2000-01-01"), // Default YOB
          gender: true, // Default to male
        });
        await newMember.save();
        return done(null, newMember);
      } catch (err: any) {
        return done(err, null);
      }
    },
  ),
);
