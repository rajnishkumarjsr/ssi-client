import { Collapse } from "react-collapse";
import React, { useState } from 'react';

export default function Faq() {

    //const [isOpened,setIsOpened] = useState(false);
    //const [isOpenedGRE,setIsOpenedGRE] = useState(false);
    // const toggleCollapse = () => {
    //   setIsOpened(!isOpened);
    // }
    

    const [open, setOpen] = useState({
    section1: true,
    section2: false,
    section3: false,
  });

   const toggleCollapse = (section) => {
    setOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Find quick answers to common questions</p>
        </div>
      </section>

      <section className="faq-content">

      {/* GMAT FAQ */}
        <div style={{margin:"20px", fontFamily:"Arial, sans-serif"}}>
          <button onClick={() => toggleCollapse("section1")}
            style={{
              fontWeight: 'bold',
              border: '2px solid #000',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {/* {isOpened ? 'GMAT FAQ - Collapse' : 'GMAT FQA - Expand'} */}
            {open.section1 ? "GMAT FAQ - Collapse" : "GMAT FAQ - Expand"}
          </button>

          <Collapse isOpened={open.section1}>
            <div className="faq-item">
              <h3>1. Why the GMAT?</h3>
              <p>
                To secure admission at Top B-Schools all over the world.
              </p>
              <br />
              <h3>2. Who can take the GMAT?</h3>
              <p>
                Any undergrad who aspires to study MBA at Top B-Schools.
              </p>
              <br />
              <h3>3. Where can I take the GMAT in India?</h3>
              <p>
                There are several authorized test centers in major cities to write the test. There is home-center facility under strict observation. But it is advised to take the test at authorized centers.
              </p>
              <br />
              <h3>4. What ID is required at the test center?</h3>
              <p>
                Passport is must alongside admit card.
              </p>
              <br />
              <h3>5. What is the test structure and timing?</h3>
              <p>
                GMAT tests: a. Data Insight b. Quantitative Reasoning and c. Verbal Reasoning. Test of each section will last 45 minutes, cumulating to 135 minutes or 2 hours and 15 minutes.
              </p>
              <br />
              <h3>6. Are calculators allowed?</h3>
              <p>
                No. Calculators are strictly restricted.
              </p>
              <br />
              <h3>7. What is the maximum score on the GMAT?</h3>
              <p>
                805/ 100thpercentile is the maximum score on the GMAT.
              </p>
              <br />
              <h3>8. How long are scores valid?</h3>
              <p>
                GMAT scores are typically valid for five years.
              </p>
              <br />
              <h3>9. Should I join coaching or self-study in India?</h3>
              <p>
                Depends. To be sure whether you need coaching or not, you must take the Diagnostic Test and receive an exclusive report designed for you. Follow the advice and proceed accordingly. 
              </p>
              <br />
              <h3>10. What study materials are recommended?</h3>
              <p>
                We strongly recommend Official Guide and Our Test and Practice material designed with great research and adopted after trials and tests.
              </p>
              <br />
              <h3>11. Which section is challenging?</h3>
              <p>
                Of three sections, it depends where a candidate may struggle. Usually, Indian test takers need to focus on Verbal Reasoning because Quantitative Reasoning and Data Insight do not pose any threat to them.
              </p>
              <br />
              <h3>12. What is a good score on the GMAT?</h3>
              <p>
                It varies but a score above 625 could be competent.
              </p>
              <br />
              <h3>13. What is an ideal score to make it at Top B-Schools?</h3>
              <p>
                Most of the Top B-Schools have high cut off score demand. So, 705/ 99th percentile may be an ideal score.
              </p>
              <br />
              <h3>14. Why SSI?</h3>
              <p>
                We are an exclusive Test-Prep center. We believe in optimum scoring, an achievement that helps a Test-Taker enter desired school. 
              </p>
              <br />
              <h3>15. What makes GMAT exclusive prep at SSI?</h3>
              <p>
                We have developed time saving short-cut tricks unique by most means. Years long successful trials and tests of those tricks make us different.
              </p>
              <br />
              <h3>16. Do Indian B-Schools accept the GMAT score?</h3>
              <p>
                Yes. Top Indian B-Schools have begun accepting higher GMAT scores. GMAT is mandatory for foreign nationals seeking admission at Top B-Schools in India.
              </p>
              
            </div>
          </Collapse>
        </div>

      {/* GRE FAQ */}
        <div style={{margin:"20px", fontFamily:"Arial, sans-serif"}}>
          <button onClick={() => toggleCollapse("section2")}
            style={{
              fontWeight: 'bold',
              border: '2px solid #000',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {/* {open.Gmat ? 'GRE FAQ - Collapse' : 'GRE FQA - Expand'} */}
            {open.section2 ? "GRE FAQ - Collapse" : "GRE FAQ - Expand"}
          </button>

          <Collapse isOpened={open.section2}>
            <div className="faq-item">
              <h3>1. Why the GRE?</h3>
              <p>
                To secure admission and scholarships at Top Universities in the US and other destinations.
              </p>
              <br />
              <h3>2. Who can take the GRE?</h3>
              <p>
                Any undergrad who aspires to pursue Grad and beyond at renowned universities.
              </p>
              <br />
              <h3>3. Where can I take the GRE in India?</h3>
              <p>
                There are several authorized test centers in major cities to write the test.
              </p>
              <br />
              <h3>4. What ID is required at the test center?</h3>
              <p>
                Passport is must alongside admit card.
              </p>
              <br />
              <h3>5. What is the test structure and timing?</h3>
              <p>
                GRE tests: a. Analytical Writing Assessment b. Quantitative Reasoning and c. Verbal Reasoning. 
                <br />Time: a. AWA 30 minutes b. Quantitative Reasoning 47 minutes and c. Verbal Reasoning 41 minutes
                <br />Total Duration of the Test: 118 minutes/ 1 hour and 58 minutes
              </p>
              <br />
              <h3>6. Are calculators allowed?</h3>
              <p>
                Yes. On screen calculator is available for certain questions.
              </p>
              <br />
              <h3>7. What is the maximum score on the GRE?</h3>
              <p>
                340 is the maximum score on the GRE for Quantitative Reasoning and Verbal Reasoning combined. The AWA is scored 0—6.
              </p>
              <br />
              <h3>8. How long are scores valid?</h3>
              <p>
                GRE scores are typically valid for five years.
              </p>
              <br />
              <h3>9. Should I join coaching or self-study in India?</h3>
              <p>
                Depends. To be sure whether you need coaching or not, you must take the Diagnostic Test and receive an exclusive report designed for you. Follow the advice and proceed accordingly.
              </p>
              <br />
              <h3>10. What study materials are recommended?</h3>
              <p>
                We strongly recommend Official Guide and Our Test and Practice material designed after great research and adopted after trials and tests.
              </p>
              <br />
              <h3>11. Which section is challenging?</h3>
              <p>
                Of three sections, it depends where a candidate may struggle. Usually, Indian test takers need to focus on Verbal Reasoning more because Quantitative Reasoning does not pose any threat to them.
              </p>
              <br />
              <h3>12. What is a good score on the GRE?</h3>
              <p>
                It varies but a score above 325 could be competent.
              </p>
              <br />
              <h3>13. What is an ideal score to make it at Top Universities?</h3>
              <p>
                Most of the Top Universities have high cut off score demand. So, 325 may be an ideal score.
              </p>
              <br />
              <h3>14. Why SSI?</h3>
              <p>
                We are an exclusive Test-Prep center. We believe in optimum scoring, an achievement that helps a Test-Taker enter a desired school.
              </p>
              <br />
              <h3>15. What makes GRE an exclusive prep at SSI?</h3>
              <p>
                We have developed time saving short-cut tricks unique by most means. Years long successful trials and tests of those tricks make us different.
              </p>
              <br />
              <h3>16. Do Indian Universities accept the GRE score?</h3>
              <p>
                Yes. Top Indian B-Schools and Universities have begun accepting higher GRE scores. GRE is mandatory for foreign nationals seeking admission at Top B-Schools and Universities in India.
              </p>
              
            </div>
          </Collapse>
        </div>



        
       
      </section>
    </main>
  );
}
