import React, { useEffect, useState } from 'react';

import styles from "./GitHubProfilePic.module.css"

const GitHubProfilePic = ({ githubUrl }) => {
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const username = githubUrl.split('/').pop();
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setProfilePic(data.avatar_url);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePic();
  }, [githubUrl]);

  return (
    <div>
      <img className={styles.img} src={profilePic} alt={`Profile`} style={{ borderRadius: '50%'}} width={110}/>
    </div>
  );
};

export default GitHubProfilePic;
