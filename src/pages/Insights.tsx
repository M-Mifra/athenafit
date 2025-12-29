import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Personalized Training Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-card border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Readiness Score</h3>
            <p className="text-muted-foreground">Your score is calculated based on HRV, sleep quality, and previous training load.</p>
          </div>
          <div className="p-6 rounded-xl bg-card border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Recovery Trends</h3>
            <p className="text-muted-foreground">Analyzing your 7-day average to optimize your next cycle.</p>
          </div>
          <div className="p-6 rounded-xl bg-card border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Bio-Feedback</h3>
            <p className="text-muted-foreground">Integrating physiological data with perceived exertion.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
