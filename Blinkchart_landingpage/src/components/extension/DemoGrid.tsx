import "./demogrid.css";
import DemoCard from "./DemoCard";

export default function DemoGrid() {
  return (
    <section className="demo-grid-wrapper">

      <div className="demo-intro">

        <span>INTERACTIVE DEMO</span>

        <h2>
          Five datasets.
          <br />
          Five perfect charts.
        </h2>

        <p>
          Each dataset triggers a different AI-powered
          visualization recommendation from BlinkChart.
        </p>

      </div>

      {/* LINE CHART */}

      <DemoCard
        title="Quarterly Revenue — SaaS Company"
        chart="Line Chart"
        confidence="96%"
        scenario="Time series · Trending upward · Multi-metric"
        type="line"
      >

        <table>
          <thead>
            <tr>
              <th>Quarter</th>
              <th>MRR</th>
              <th>ARR</th>
              <th>Customers</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Q1 2024</td>
              <td>$8,200</td>
              <td>$98,400</td>
              <td>42</td>
            </tr>

            <tr>
              <td>Q2 2024</td>
              <td>$12,400</td>
              <td>$148,800</td>
              <td>67</td>
            </tr>

            <tr>
              <td>Q3 2024</td>
              <td>$18,900</td>
              <td>$226,800</td>
              <td>94</td>
            </tr>

            <tr>
              <td>Q4 2024</td>
              <td>$27,500</td>
              <td>$330,000</td>
              <td>128</td>
            </tr>
          </tbody>
        </table>

      </DemoCard>


      {/* WATERFALL */}

      <DemoCard
        title="P&L Bridge Analysis"
        chart="Waterfall Chart"
        confidence="94%"
        scenario="Sequential · Financial · Positive/Negative"
        type="waterfall"
      >

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Impact</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>New Contracts</td>
              <td>+$380,000</td>
              <td>Growth</td>
            </tr>

            <tr>
              <td>Customer Churn</td>
              <td>-$210,000</td>
              <td>Loss</td>
            </tr>

            <tr>
              <td>FX Headwinds</td>
              <td>-$42,000</td>
              <td>Loss</td>
            </tr>

            <tr>
              <td>Net Revenue</td>
              <td>+$1,358,000</td>
              <td>Final</td>
            </tr>
          </tbody>
        </table>

      </DemoCard>


      {/* DONUT */}

      <DemoCard
        title="BI Tool Market Share 2025"
        chart="Donut Chart"
        confidence="91%"
        scenario="Part-of-whole · Proportional"
        type="donut"
      >

        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Market Share</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Power BI</td>
              <td>34.2%</td>
              <td>$4.8B</td>
            </tr>

            <tr>
              <td>Tableau</td>
              <td>22.7%</td>
              <td>$3.2B</td>
            </tr>

            <tr>
              <td>Looker</td>
              <td>15.4%</td>
              <td>$2.1B</td>
            </tr>

            <tr>
              <td>Qlik</td>
              <td>11.9%</td>
              <td>$1.7B</td>
            </tr>
          </tbody>
        </table>

      </DemoCard>


      {/* SCATTER */}

      <DemoCard
        title="Pricing vs Conversion Rate"
        chart="Scatter Plot"
        confidence="93%"
        scenario="Correlation · Numeric variables"
        type="scatter"
      >

        <table>
          <thead>
            <tr>
              <th>Experiment</th>
              <th>Price</th>
              <th>Conversion</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Exp-01</td>
              <td>$5</td>
              <td>18.4%</td>
            </tr>

            <tr>
              <td>Exp-02</td>
              <td>$7</td>
              <td>16.9%</td>
            </tr>

            <tr>
              <td>Exp-03</td>
              <td>$9</td>
              <td>15.2%</td>
            </tr>

            <tr>
              <td>Exp-04</td>
              <td>$12</td>
              <td>13.8%</td>
            </tr>
          </tbody>
        </table>

      </DemoCard>


      {/* MAP */}

      <DemoCard
        title="Revenue by Country"
        chart="Choropleth Map"
        confidence="97%"
        scenario="Geographic · Spatial distribution"
        type="map"
      >

        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Revenue</th>
              <th>Growth</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>United States</td>
              <td>$482,000</td>
              <td>+22%</td>
            </tr>

            <tr>
              <td>United Kingdom</td>
              <td>$148,000</td>
              <td>+18%</td>
            </tr>

            <tr>
              <td>Germany</td>
              <td>$124,000</td>
              <td>+31%</td>
            </tr>

            <tr>
              <td>India</td>
              <td>$38,000</td>
              <td>+89%</td>
            </tr>
          </tbody>
        </table>

      </DemoCard>

    </section>
  );
}