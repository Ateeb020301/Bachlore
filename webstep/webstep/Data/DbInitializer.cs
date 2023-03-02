namespace webstep.Data
{
    using System;
    using System.Collections.Generic;
    using System.Dynamic;
    using System.Linq;
    using HotChocolate;
    using HotChocolate.Data;

    using NodaTime;
    using NodaTime.Extensions;

    using webstep.Models;
    public class DbInitializer
    {
        public static void Initialize(WebstepContext context)
        {
            
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            
            context.Sellers.AddRange(DummySellers());
            context.Consultants.AddRange(DummyConsultants());
            context.Financials.AddRange(DummyFinancials());
            context.Customer.AddRange(DummyCustomers());
            context.Teams.AddRange(DummyTeam(context));
            context.SaveChanges();
            context.Vacancies.AddRange(DummyVacancies(context));
            context.Prospects.AddRange(DummyProspects(context));
            context.Projects.AddRange(DummyProjects(context));
            context.SaveChanges();
            context.SubProspects.AddRange(DummySubProspects(context));
            context.Contracts.AddRange(DummyContracts(context));
            context.SaveChanges();
            context.TeamsConsultant.AddRange(DummyTeamConsultant(context));
            context.SaveChanges();
        }

        /// <summary>
        /// Creates a list of dummy sellers
        /// </summary>
        /// <returns>
        /// The <see cref="List{Seller}"/>.
        /// </returns>
        public static List<Customer> DummyCustomers()
        {

            return new List<Customer>()
            {
                new Customer
                {
                    FirstName = "Ateeb",
                    LastName = "Salam",
                    Adresse = "Snypemyrlia 9",
                    Email = "ateeb@live.no",
                    Tlf = "40749470"
                },
                new Customer
                {
                    FirstName = "Mohammad",
                    LastName = "Abo Khalifa",
                    Adresse = "Byggveien 7",
                    Email = "mohammedabo0102@hotmail.com",
                    Tlf = "45418389"
                },
                new Customer
                {
                    FirstName = "Hassan",
                    LastName = "Mehmod Hussain",
                    Adresse = "Brunasvei 93",
                    Email = "hassanreserve10@gmail.com",
                    Tlf = "45457590"
                },
                new Customer
                {
                    FirstName = "Naveen",
                    LastName = "Vijayasanker",
                    Adresse = "Havreveien 32",
                    Email = "naveen150301@gmail.com",
                    Tlf = "46762686"
                },
            };
        }

        /// <summary>
        /// Creates a list of dummy sellers
        /// </summary>
        /// <returns>
        /// The <see cref="List{Seller}"/>.
        /// </returns>
        public static List<Seller> DummySellers()
        {
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            LocalDate today = clock.GetCurrentDate();
            LocalDate startDate = new LocalDate(2021, 1, 19);

            return new List<Seller>()
            {
                new Seller
                {
                    FullName = "Alexander Johnson",
                    Email = "Alexander@gmail.com",
                    EmploymentDate = today,
                    NameIdentifier = "12132342332"
                },
                new Seller
                {
                    FullName = "John Michael",
                    Email = "John@tester.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "12334243323"
                },
                new Seller
                {
                    FullName = "Greg Hebert",
                    Email = "GregMHebert@jourrapide.com",
                    EmploymentDate = today,
                    NameIdentifier = "121212121212"
                },
                new Seller
                {
                    FullName = "Jerry Letourneau",
                    Email = "Jerry.Letourneau@gmail.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "989238389"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "734783483489"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "783483489"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "734783Yass889"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "7347883489"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "7347834834"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "7347834489"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "3483489"
                },
                new Seller
                {
                    FullName = "Cheryl E. Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "7783483489"
                },
                new Seller
                {
                    FullName = "This boring Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "73test33489"
                },
                new Seller
                {
                    FullName = "Test Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "7343483489"
                },
                new Seller
                {
                    FullName = "John Doe",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "7347834889"
                },
                new Seller
                {
                    FullName = "James Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "73473483489"
                },
                new Seller
                {
                    FullName = "Pedro Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "73478383489"
                },
                new Seller
                {
                    FullName = "Peter Kramer",
                    Email = "CherylEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "73478348348"
                },
                new Seller
                {
                    FullName = "Gwen E. Kramer",
                    Email = "Gwen@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "73783483489"
                },
                new Seller
                {
                    FullName = "Cyril E. Kramer",
                    Email = "CyrilEKramer@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "34783483489"
                },
                new Seller
                {
                    FullName = "Carol ",
                    Email = "Carol@dayrep.com",
                    EmploymentDate = today,
                    NameIdentifier = "73483483489"
                },
                new Seller
                {
                    FullName = "Johnny johnson",
                    Email = "Johnny@dayrep.com",
                    EmploymentDate = startDate,
                    NameIdentifier = "7347833489"
                }
            };
        }

        /// <summary>
        /// Creates a list of dummy consultants.
        /// </summary>
        /// <returns>
        /// The <see cref="List{Consultant}"/>.
        /// </returns>
        public static List<Consultant> DummyConsultants()
        {
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            LocalDate today = clock.GetCurrentDate();

            return new List<Consultant>()
            {
            new Consultant{FirstName = "John", LastName = "Doe", EmploymentDate = new LocalDate(2018,05,05), Workdays = 5},
            new Consultant{FirstName = "Jane", LastName = "Doe", EmploymentDate = new LocalDate(2018,05,05), Workdays = 5 },
            new Consultant{FirstName = "Peter", LastName = "Parker", EmploymentDate = new LocalDate(2018,05,05), ResignationDate = today.PlusDays(12), Workdays = 5},
            new Consultant{FirstName = "Bart", LastName = "Simpson", EmploymentDate = new LocalDate(2018,05,05), Workdays = 5},
            new Consultant{FirstName = "Pedro", LastName = "Johnson", EmploymentDate = new LocalDate(2018,05,05), Workdays = 5 },
            new Consultant{FirstName = "Benjamin", LastName= "Oakwood", EmploymentDate = new LocalDate(2018,05,05), Workdays = 3}
            };
        }


        public static List<Project> DummyProjects(WebstepContext context)
        {
            var team = context.Teams.ToList();

            return new List<Project>()
            {
                new Project()
                {
                    CustomerName = "Bouvet",
                    ProjectName = "Kassesystem",
                    Team = team[0],
                },
                new Project()
                {
                    CustomerName = "Innow",
                    ProjectName = "Idk man",
                    Team = team[0],
                },
                new Project()
                {
                    CustomerName = "xLedger",
                    ProjectName = "Sikkerhet",
                    Team = team[1],
        }
            };
        }
        

        /// <summary>
        /// Creates a list of dummy prospects.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <returns>
        /// The <see cref="List{Prospect}"/>.
        /// </returns>
        public static List<Prospect> DummyProspects(WebstepContext context)
        {
            var seller = context.Sellers.ToList();

            return new List<Prospect>()
            {
                new Prospect
                {
                    ProjectName = "Coopay",
                    CustomerName = "Coop Prix Gimlevang",
                    Seller = seller[0]
                },
                new Prospect
                {
                    ProjectName = "Kassesystem",
                    CustomerName = "Joker lillemarkens",
                    Seller = seller[1]
                },
                new Prospect
                {
                    ProjectName = "GraphQL implementasjon",
                    CustomerName = "UIA",
                    Seller = seller[2]
                },
                new Prospect
                {
                    ProjectName = "Pentest",
                    CustomerName = "Stortinget",
                    Seller = seller[3]
                },
                new Prospect
                {
                    ProjectName = "Sikkerhetskonsultasjon",
                    CustomerName = "Confirmit",
                    Seller = seller[0]
                },
                new Prospect
                {
                    ProjectName = "Idk man",
                    CustomerName = "Innow AS",
                    Seller = seller[4]
                }
            };
        }

        /// <summary>
        /// Creates a list of  subProspects.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <returns>
        /// The <see cref="List{subProspect}"/>.
        /// </returns>
        public static List<SubProspect> DummySubProspects(WebstepContext context)
        {
            var prospect = context.Prospects.ToList();
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            LocalDate today = clock.GetCurrentDate();

            return new List<SubProspect>()
            {
                new SubProspect
                {
                    StartDate = today.PlusDays(10),
                    EndDate = today.PlusDays(20),
                    Probability = 10,
                    NumOfConsultants = 5,
                    Prospect = prospect[0]
                },
                new SubProspect 
                { 
                    StartDate = today.PlusDays(14),
                    EndDate = today.PlusDays(20),
                    Probability = 30,
                    NumOfConsultants = 5,
                    Prospect = prospect[1]
                },
                new SubProspect
                {
                    StartDate = today.PlusDays(30),
                    EndDate = today.PlusDays(50),
                    Probability = 30,
                    NumOfConsultants = 5,
                    Prospect = prospect[2]
                },
                new SubProspect
                {
                    StartDate = today.PlusDays(10),
                    EndDate = today.PlusDays(60),
                    Probability = 30,
                    NumOfConsultants = 5,
                    Prospect = prospect[2]
                },
                new SubProspect
                {
                    StartDate = today.PlusDays(20),
                    EndDate = today.PlusDays(40),
                    Probability = 30,
                    NumOfConsultants = 5,
                    Prospect = prospect[3]
                }
            };
        }

        /// <summary>
        /// Creates a list of dummy contracts.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <returns>
        /// The <see cref="List{Contract}"/>.
        /// </returns>
        public static List<Contract> DummyContracts(WebstepContext context)
        {
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            LocalDate today = clock.GetCurrentDate();

            var projects = context.Projects.ToList();

            return new List<Contract>()
            {
                new Contract
                {
                    StartDate = today,
                    EndDate = today.PlusDays(6),
                    Project = projects[0],
                    DaysOfWeek = 5,
                    HourlyRate = 1150,

                },
                new Contract
                {
                    StartDate = today.PlusWeeks(4),
                    EndDate = today.PlusWeeks(5),
                    Project = projects[0],
                    DaysOfWeek = 5,
                    HourlyRate = 1150
                },
                new Contract
                {
                    StartDate = today.PlusWeeks(4),
                    EndDate = today.PlusWeeks(5),
                    Project = projects[0],
                    DaysOfWeek = 3,
                    HourlyRate = 1150
                },
                new Contract
                {
                    StartDate = today.PlusWeeks(8),
                    EndDate = today.PlusWeeks(11),
                    Project = projects[0],
                    DaysOfWeek = 4,
                    HourlyRate = 1150
                },
                new Contract
                {
                    StartDate = today.PlusWeeks(8),
                    EndDate = today.PlusWeeks(11),
                    Project = projects[0],
                    DaysOfWeek = (decimal)4.25,
                    HourlyRate = 1150
                },
                new Contract
                {
                    StartDate = today.PlusWeeks(12),
                    EndDate = today.PlusWeeks(14),
                    Project = projects[0],
                    DaysOfWeek = (decimal) 3.98,
                    HourlyRate = 1150
                },
                new Contract
                {
                    StartDate = today.PlusWeeks(12),
                    EndDate = today.PlusWeeks(14),
                    Project = projects[1],
                    DaysOfWeek = 5,
                    HourlyRate = 1150
                },
                new Contract
                {
                    StartDate = today.PlusWeeks(24),
                    EndDate = today.PlusWeeks(29),
                    Project = projects[0],
                    DaysOfWeek = 5,
                    HourlyRate = 1150
                },
                new Contract
                {
                    StartDate = today.PlusWeeks(24),
                    EndDate = today.PlusWeeks(29),
                    Project = projects[1],
                    DaysOfWeek = (decimal) 3.55,
                    HourlyRate = 1150,
                }
            };
        }

        public static List<Team> DummyTeam(WebstepContext context)
        {
            return new List<Team>()
            {
                new Team
                {
                     TeamName = "Team 1"

                },
                new Team
                {
                     TeamName = "Team 2"
                },
                new Team
                {
                     TeamName = "Team 3"

                },
            };
        }

        public static List<TeamConsultant> DummyTeamConsultant(WebstepContext context)
        {
            var team = context.Teams.ToList();
            var consultant = context.Consultants.ToList();

            return new List<TeamConsultant>()
            {
                new TeamConsultant
                {
                     Consultant = consultant[0],
                     Team = team[0]
                },
                new TeamConsultant
                {
                     Consultant = consultant[1],
                     Team = team[0]
                },
                new TeamConsultant
                {
                     Consultant = consultant[2],
                     Team = team[1]

                },
                new TeamConsultant
                {
                     Consultant = consultant[0],
                     Team = team[1]

                },
            };
        }

        public static List<Vacancy> DummyVacancies(WebstepContext context)
        {
            var consultant = context.Consultants.OrderBy(x => x.Id).First();
            var zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            var clock = SystemClock.Instance.InZone(zone);
            var today = clock.GetCurrentDate();
            return new List<Vacancy>()
            {
                new Vacancy()
                {
                    Planned = false,
                    StartDate = today,
                    EndDate = today.PlusDays(7),
                    DaysOfWeek = 5,
                    Consultant = consultant
                },
                new Vacancy()
                {
                    Planned = true,
                    StartDate = today.PlusDays(20),
                    EndDate = today.PlusDays(110),
                    DaysOfWeek = 2,
                    Consultant = consultant
                }
            };
        }

        /// <summary>
        /// Creates a list dummy financial records.
        /// </summary>
        /// <returns>
        /// The <see cref="List{Financial}"/>.
        /// </returns>
        public static List<Financial> DummyFinancials()
        {
            var s = new Random();
            var financials = new List<Financial>();
            for (var j = 2017; j < 2021; j++)
            {
                for (var i = 1; i < 13; i++)
                {
                    financials.Add(new Financial
                    {
                        Year = j,
                        Month = i,
                        Revenue = 1000000,
                        ActualRevenue = 1000000 + s.Next(200000, 400000),
                        EBIT = 110000,
                        ActualEBIT = 110000 + s.Next(10000, 25000),
                        DefaultHourlyRate = 1150,
                        ActualHourlyRate = 1155 + s.Next(1,5)
                    });
                }
            }

            financials.AddRange(new List<Financial>()
            {
                new Financial()
                {
                    Year = 2021,
                    Month = 1,
                    Revenue = 1000000,
                    ActualRevenue = 1000000 + s.Next(200000, 400000),
                    EBIT = 110000,
                    ActualEBIT = 110000 + s.Next(10000, 25000),
                    DefaultHourlyRate = 1150,
                    ActualHourlyRate = 1155 + s.Next(1,5)
                },
                new Financial()
                {
                    Year = 2021,
                    Month = 2,
                    Revenue = 1000000,
                    ActualRevenue = 1000000 + s.Next(200000, 400000),
                    EBIT = 110000,
                    ActualEBIT = 110000 + s.Next(10000, 25000),
                    DefaultHourlyRate = 1150,
                    ActualHourlyRate = 1155 + s.Next(1,5)
                },
                new Financial()
                {
                    Year = 2021,
                    Month = 3,
                    Revenue = 1000000,
                    ActualRevenue = 1000000 + s.Next(200000, 400000),
                    EBIT = 110000,
                    ActualEBIT = 110000 + s.Next(10000, 25000),
                    DefaultHourlyRate = 1150,
                    ActualHourlyRate = 1155 + s.Next(1,5)
                },
                new Financial()
                {
                    Year = 2021,
                    Month = 4,
                    Revenue = 1000000,
                    ActualRevenue = 1000000 + s.Next(200000, 400000),
                    EBIT = 110000,
                    ActualEBIT = 110000 + s.Next(10000, 25000),
                    DefaultHourlyRate = 1150,
                    ActualHourlyRate = 1155 + s.Next(1,5)
                }
            });
            
            return financials;
        }
    }
}
