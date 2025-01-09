import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohitvarma2022@gmail.com', // Aap apna email daalein
    pass: 'axqs iowy tzcz isdy', // Aap apna password ya app password daalein
  },
});

// Function to send OTP
const sendOTP = (email, otp) => {
  const mailDetails = {
    from: 'mohitvarma2022@gmail.com',
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP is: ${otp}`,
  };

  return new Promise((resolve, reject) => {
    mailer.sendMail(mailDetails, (err, data) => {
      if (err) {
        reject('Failed to send OTP');
      } else {
        resolve('OTP sent successfully');
      }
    });
  });
};

export { sendOTP };
