let otpSotre = [];

const getOtpSotre = () => otpSotre;

const setOtpSotre = (newData) => {
    otpSotre = [...otpSotre, newData];
};

module.exports = {
    getOtpSotre,
    setOtpSotre,
};
