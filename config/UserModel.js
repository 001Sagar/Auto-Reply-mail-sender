// module.exports = (passport) => {
//     passport.use(new GoogleStrategy({
//         clientID: '261918443088-40mkl2rmuref44p4nv5gkagdq70fr4in.apps.googleusercontent.com',
//         clientSecret:'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',
//         callbackURL: "http://127.0.0.1:8000/",
//         passReqToCallback : true
//       },
//       async (request, accessToken, refreshToken, profile, done) => {
//         try {
//             let existingUser = await User.findOne({ 'google.id': profile.id });
//             <em>// if user exists return the user</em> 
//             if (existingUser) {
//               return done(null, existingUser);
//             }
//             <em>// if user does not exist create a new user</em> 
//             console.log('Creating new user...');
//             const newUser = new User({
//               method: 'google',
//               google: {
//                 id: profile.id,
//                 name: profile.displayName,
//                 email: profile.emails[0].value
//               }
//             });
//             await newUser.save();
//             return done(null, newUser);
//         } catch (error) {
//             return done(error, false)
//         }
//       }
//     ));
// }
