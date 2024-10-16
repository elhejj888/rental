export default function ErrorPage({ error }) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error || "An unknown error occurred."}</p>
      </div>
    );
  }
  
  ErrorPage.getInitialProps = ({ query }) => {
    const { error } = query;
    return { error };
  };
  