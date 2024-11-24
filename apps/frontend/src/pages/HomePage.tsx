import BaseLayout from "../layout/BaseLayout";
import BarChartSummaries from "../components/Summary/Summary"; // Ajusta la ruta según donde esté tu archivo
 

export const HomePage = () => {
  return (
    <BaseLayout title="Home">
      <p>Welcome to the home page!</p>
      <h1>Test Chart</h1>
      <BarChartSummaries />
    </BaseLayout>
  );
};

export default HomePage;
