const generateDescription = async ({
    jobTitle,
    keyWords,
    tone,
    numWords,
    salary,
    company,
    experience,
    location,
  }) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: `Write a job description along with responsibilities for a  ${jobTitle} role in ${company} company 
            with a salary around ${salary} ${experience ? `with experience of ${experience} years` : ""} that is around ${
              numWords || 200
            } words in a ${tone || "neutral"} tone.The location for job is ${location} ${
              keyWords ? `with following requirements like: ${keyWords} for the job.` : ""
            }. The job position should be described in a way that is SEO friendly, highlighting its unique features and benefits.`,
            max_tokens: 100,
            temperature: 0.5,
          }),
        }
      );
      const data = await response.json();
  
      return data.choices[0].text;
    } catch (err) {
      console.error(err);
    }
  };
  
  export default async function handler(req, res) {
    const { jobTitle, industry, keyWords, tone, numWords,salary,
      company,
      experience,location} = req.body;
  
    const jobDescription = await generateDescription({
      jobTitle,
      keyWords,
      tone,
      numWords,
      salary,
      company,
      experience,
      location
    });
  
    res.status(200).json({
      jobDescription,
    });
  }